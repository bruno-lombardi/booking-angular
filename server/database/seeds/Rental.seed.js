const Rental = require('../models/Rental')

const rentals = [
  {
    title: "Central Park Apartment",
    city: "New York",
    street: "42 St",
    category: "apartment",
    image: "https://picsum.photos/400/600",
    description: "Nice apartment next to Central Park",
    dailyRate: 362,
    bedrooms: 1,
    shared: true
  },
  {
    title: "Times Square Apartment",
    city: "Manhatan",
    street: "99 St",
    category: "condo",
    image: "https://picsum.photos/400/600",
    description: "Nice apartment next to Times Square Garden",
    dailyRate: 150,
    bedrooms: 2,
    shared: true    
  },
  {
    title: "Times Square Apartment",
    city: "Manhatan",
    street: "44 St",
    category: "apartment",
    image: "https://picsum.photos/400/600",
    description: "Nice apartment next to Times Square Garden",
    dailyRate: 600,
    bedrooms: 3,
    shared: true
  },
  {
    title: "Beauty Beach House",
    city: "San Francisco",
    street: "Long Beach St",
    category: "house",
    image: "https://picsum.photos/800/600",
    description: "Nice beach house next to San Francisco Bay",
    dailyRate: 99,
    bedrooms: 5,
    shared: true
  }
]

const seed = async () => {
  try {
    const saved = await Rental.insertMany(rentals.splice(1, 3))
  } catch (error) {
    throw error
  }
}

module.exports = {
  rentals,
  seed
}