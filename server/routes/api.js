const express = require('express')
const router = express.Router()

const User = require('../database/models/User')
const RentalController = require('../controllers/rental.controller')

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ title: 'E-Commerce system API', version: '1.0' })
})

router.post('/auth/register', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await new User({email, password}).save()
    const token = await user.generateAuthToken()
    res.cookie('Authorization', token)
    res.status(201).json(user)
  } catch (err) {
    // duplicated email
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This email is already registered.', code: err.code})
    }

    if(err.errors) {
      const errors = err.errors
      if(errors.email) {
        return res.status(400).json({ message: errors.email.message, code: 400 })
      }
      if(errors.password) {
        return res.status(400).json({ message: errors.password.message, code: 400 })
      }
    }
    res.status(500).json(err)
  }

})

router.post('/auth/login', async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.findByCredentials(email, password)
    if(user) {
      const token = await user.generateAuthToken()
      res.cookie('Authorization', token)
      res.status(200).json(user)
    } else {
      const error = new Error('Wrong email or password')
      error.code = -10
      throw error
    }
    
  } catch (err) {
    if(err.code === -10) {
      return res.status(400).json({ message: err.message, code: err.code })
    }
    res.status(500).json(err)
  }
})

router.get('/rental', RentalController.all)
router.get('/rental/:id', RentalController.find)
router.post('/rental', RentalController.create)

module.exports = router;
