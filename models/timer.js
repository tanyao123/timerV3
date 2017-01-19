var mongoose = require('mongoose')
var TimerSchema = require('../Schema/TimerSchema.js')
var Timer = mongoose.model('Timer', TimerSchema)

module.exports = Timer