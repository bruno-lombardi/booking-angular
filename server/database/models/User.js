const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { addToTimeFromString } = require('../../helpers/time')

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    minlength: [3, 'Email is too short'],
    maxlength: [254, 'Email is too long'],
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password is 6 characters minimum']
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  return Object.assign({}, {_id: userObject._id, email: userObject.email})
}

UserSchema.methods.generateAuthToken = async function() {
  const user = this
  const access = 'auth'

  // unix epoch with added time from now
  const expiration = addToTimeFromString(process.env.JWT_EXPIRATION).valueOf()

  const token = jwt.sign({_id: user._id.toHexString(), access, exp: expiration}, process.env.JWT_SECRET)
  user.tokens.push({access, token})
  
  await user.save()

  return token
}

UserSchema.methods.removeToken = async function(token) {
  const user = this
  let found = false
  user.tokens.forEach(((t, index, tokens) => {
    if(t._id === token._id) {
      found = true
      tokens.splice(index, 1)
    }
  }))

  try {
    if(found) {
      await user.save()
    }
  } catch (err) {
    throw err
  }
}

UserSchema.statics.findByToken = async function(token) {
  let User = this
  let decoded
  let user = null

  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET)
    user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    })  
  } catch (err) {
    throw err
  }

  return user
}

UserSchema.statics.findByCredentials = async function(email, password) {
  let User = this
  try {
    const user = await User.findOne({email})
    if(user) {
      const result = await bcrypt.compare(password, user.password)
      if(result) {
        return user
      }

    }
  } catch (err) {
    throw err
  }
  return null
}

UserSchema.pre('save', async function(next) {
  let user = this

  if(user.isModified('password')) {
    let pass = user.password

    try {
      const salt = await bcrypt.genSalt(12)
      const hash = await bcrypt.hash(pass, salt)
      user.password = hash
      next()
    } catch (err) {
      next(err)
    }

  } else {
    next()
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User