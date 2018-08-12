const db = require('../../../database/mongoose')
const User = require('../../../database/models/User')
const jwt = require('jsonwebtoken')

describe('User Model', () => {
  beforeAll(async () => {
    require('dotenv').config()
    await db.connect()
    await User.deleteMany({})
  })

  afterAll(async () => {
    await db.disconnect()
  })
  
  test('should generate hash for user', async () => {
    const email = 'drhouse@cuddy.com'
    const password = 'ilovecameron'

    const user = new User({
      email,
      password
    })

    try {
      await user.save()
      const userFound = await User.findByCredentials(email, password)
      expect(userFound.email).toBe(email)
    } catch (err) {
      
    }
  })

  test('user toJSON should return _id and email only', async () => {
    const user = new User({
      email: 'fakeemail@email.com', 
      password: 'password'
    })
    
    try {
      await user.save()
      const userJSON = user.toJSON()
      expect(userJSON).toEqual({_id: user._id, email: user.email})
    } catch (err) {
      console.log(err)
      throw err
    }
  })

  test('user should generateAuthToken', async () => {
    const user = new User({
      email: 'testdumbemail@email.com',
      password : 'amazing password'
    })

    try {
      await user.save()
      await user.generateAuthToken()
      
      const token = user.tokens[0].token
      expect(token).toBeTruthy()
      
      const decoded = await jwt.verify(token, process.env.JWT_SECRET)
      expect(decoded._id).toBe(user._id.toHexString())

    } catch (err) {
      console.log(err)
      throw err
    }
  })

  test('user should removeToken', async () => {
    const user = new User({
      email: 'asdfasf@asdfas.com',
      password: '341230sdf'
    })

    try {
      await user.save()
      await user.generateAuthToken()

      // console.log(user.tokens[0])
      await user.removeToken(user.tokens[0])

      expect(user.tokens[0]).toBeFalsy

    } catch (err) {
      console.log(err)
      throw err  
    }
  })

  test('find a user with a token', async () => {
    const user = new User({
      email: 'tokenizeduser@token.com',
      password: 'tokensimple'
    })

    try {
      await user.save()
      await user.generateAuthToken()

      const userFound = await User.findByToken(user.tokens[0].token)
      expect(userFound._id.toHexString()).toBe(user._id.toHexString())

    } catch (err) {
      console.log(err)
      throw err
    }

  })

})
