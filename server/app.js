const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const api = require('./routes/api')

const app = express()

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1', api)

/**
 * Catch 404 error and foward to error handler
 */
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

/**
 * Error handler, submit error only in development
 */
app.use((err, req, res, next) => {
  const error = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  }
  res.status(err.status || 500)
  res.json(error)
})

module.exports = app
