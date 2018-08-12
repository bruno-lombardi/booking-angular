const Rental = require("../database/models/Rental")

class RentalController {
  static async all(req, res) {
    try {
      const rentals = await Rental.find({})
      res.status(200).json(rentals)
    } catch (err) {
      res.status(500).json({title: 'An internal server error ocurred', detail: 'Try again in a few moments. If you are the webmaster, you might want to check the system.'})
    }
    const rentals = await Rental.find()

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
