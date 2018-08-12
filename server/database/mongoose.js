const mongoose = require('mongoose')
const debug = require('debug')('nodejs-auth:database');

class Database {
  static async connect() {
    let connection = undefined

    try {
      switch(process.env.NODE_ENV) {
        case 'production':
          connection = await mongoose.connect(process.env.DB_PRODUCTION_URI)
          break
        case 'test':
          connection = await mongoose.connect(process.env.DB_TEST_URI, {useNewUrlParser: true})
          debug(`Connected to database URI ${process.env.DB_TEST_URI}`)
          break
        default:
          connection = await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
          debug(`Connected to database URI ${process.env.DB_URI}`)
          break
      }
      // Success connecting to db
      return true

    } catch (err) {
      debug(err)
      return false
    }
  }

  static async disconnect() {
    await mongoose.disconnect()
  }
}

module.exports = Database;
