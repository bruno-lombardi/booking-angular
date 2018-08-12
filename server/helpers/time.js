const moment = require('moment')

const addToTimeFromString = (time = '1h') => {
  const regExOutput = /(\d+)(\w{1})/.exec(time)
  const timeToAdd = {
    value: parseInt(regExOutput[1]), 
    time: regExOutput[2]
  }
  return moment().add(timeToAdd.value, timeToAdd.time)
}

module.exports = {
  addToTimeFromString
}