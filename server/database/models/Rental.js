const mongoose = require('mongoose')

const RentalSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    max: [128, 'Too long, max 128 characters'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    lowercase: true
  },
  street: {
    type: String,
    required: true,
    min: [4, 'Too short, min 4 characters'],
  },
  category: {
    type: String,
    required: true,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  bedrooms: Number,
  shared: Boolean,
  description: {
    type: String,
    required: true
  },
  dailyRate: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Rental = mongoose.model('Rental', RentalSchema)
module.exports = Rental