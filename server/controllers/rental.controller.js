const Rental = require("../database/models/Rental")
const ObjectId = require('mongoose').Types.ObjectId

class RentalController {

  static async find(req, res) {
    try {
      
      const id = req.params.id
      if(!ObjectId.isValid(id)) {
        const error = new Error()
        error.message = 'Rental id is invalid'
        error.status = 406
        error.type = -1
        throw error
      }
      
      const rental = await Rental.findById(id)

      console.log(rental)
      if(!rental) {
        return res.status(400).json({errors: [
          { message: 'Rental not found' }
        ]})
      }

      res.status(200).json(rental)
    } catch (err) {
      // Request error
      if(err.type === -1) {
        return res.status(err.status).json(err)
      }
      // Server error
      res.status(500).json({errors: [
        { message: 'An internal server error ocurred. Try again later.' }
      ]})
    }
  }

  static async all(req, res) {
    try {
      console.log('all call')
      const rentals = await Rental.find({})
      console.log(rentals)
      if(!rentals) {
        return res.status(400).json({errors: [
          { message: 'No rentals were found.' }
        ]})
      }
      res.status(200).json(rentals)
    } catch (err) {
      res.status(500).json({errors: [
        { message: 'An internal server error ocurred. Try again later.' }
      ]})
    }
  }

  static async create(req, res) {
    const {
      title,
      city,
      street,
      category,
      image,
      bedrooms,
      shared,
      description,
      dailyRate
    } = req.body

    try {
      const rental = await new Rental({
        title,
        city,
        street,
        category,
        image,
        bedrooms,
        shared,
        description,
        dailyRate
      }).save()
  
      return res.status(201).json(rental)
    } catch (err) {
      if(err.errors) {
        const errors = err.errors
        const resErrors = []

        Object.keys(errors).forEach((error) => {
          const message = errors[error].message
          const code = 400
          resErrors.push({message, code})
        })

        return res.status(400).json({errors: resErrors})
      }
      if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        return res.status(500).json(err)
      }
      
      res.status(500).json({title: 'An internal server error ocurred', detail: 'Try again in a few moments. If you are the webmaster, you might want to check the system.'})
      
    }
  }
}

module.exports = RentalController
