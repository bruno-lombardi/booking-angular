const app = require('../../app')
const request = require('supertest')
const db = require('../../database/mongoose')
const User = require('../../database/models/User')
const UserSeed = require('../../database/seeds/User.seed')
const api = '/api/v1'

describe('Tests auth routes', () => {
  beforeAll(async () => {
    require('dotenv').config()
    await db.connect()
    await User.deleteMany({})
    await UserSeed.seed()
  })

  // afterAll(async () => {
  //   await db.disconnect()
  // })

  test('POST /auth/register with no email or password should return 400 with error', () => {
    
    return request(app)
      .post(`${api}/auth/register`)
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.code).toBe(400)
        expect(res.body.message).toBe('Email is required')
      })
  })

  test('POST /auth/register with invalid email or password should return 400 with error', () => {

    return request(app)
      .post(`${api}/auth/register`)
      .send({email: 'a', password: 'validpassword'})
      .expect(400)
      .expect((res) => {
        expect(res.body.code).toBe(400)
        expect(res.body.message).toBeTruthy()
      })
  })

  test('POST /auth/register with already used email should return 409 with error', () => {
    return request(app)
    .post(`${api}/auth/register`)
    .send({
      email: UserSeed.users[0].email,
      password: 'anotherone'
    })
    .expect(409)
    .expect((res) => {
      expect(res.body.code).toBe(11000)
      expect(res.body.message).toBeTruthy()
    })
  })

  test('POST /auth/register with valid email and password should register', (done) => {
    let token

    request(app)
    .post(`${api}/auth/register`)
    .send(UserSeed.users[2])
    .expect(201)
    .expect((res) => {
      token = res.headers['set-cookie'].pop().split(';')[0].split('=')[1];
      expect(res.body._id).toBeTruthy()
      expect(token).toBeTruthy()
    })
    .end(((err, res) => {
      if(err) return done(err)
      
      User.findByToken(token).then((user) => {
        expect(user.email).toBe(UserSeed.users[2].email)
        done()
      }).catch(err => done(err))
      
    }))
  })
})
