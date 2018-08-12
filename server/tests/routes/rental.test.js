const app = require('../../app')
const request = require('supertest')
const db = require('../../database/mongoose')
const Rental = require('../../database/models/Rental')
const RentalSeed = require('../../database/seeds/Rental.seed')
const api = '/api/v1'

describe('Tests rental routes', () => {
  beforeAll(async () => {
    require('dotenv').config()
    try {
      await db.connect()
      await Rental.deleteMany({})
      await RentalSeed.seed()
    } catch (error) {
      throw error
    }
  })

  test('POST /api/v1/rental with invalid data should not create rental and return errors list', () => {

    return request(app)
      .post(`${api}/rental`)
      .send()
      .expect(400)
      .expect((res) => {
        expect(res.body.errors).toBeTruthy()
      })
  })

  test('POST /api/v1/rental/create with valid data should create and return a rental', () => {
    const rental = RentalSeed.rentals[0]

    return request(app)
      .post(`${api}/rental`)
      .send(rental)
      .expect(201)
      .expect((res) => {
        expect(res.body._id).toBeTruthy()
        expect(res.body.title).toBe(rental.title)
        expect(res.body.city).toBe(rental.city.toLowerCase())
        expect(res.body.street).toBe(rental.street)
        expect(res.body.image).toBe(rental.image)
      })
  })

  test('GET /api/v1/rental should return all rentals', () => {

    return request(app)
      .get(`${api}/rental`)
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(4)
        expect(res.body[0]._id).toBeTruthy()
        expect(res.body[3].title).toBe(RentalSeed.rentals[0].title)
      })
  })
})