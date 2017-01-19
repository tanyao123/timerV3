var mongoose = require('mongoose')
var UserSchema = require('../Schema/UserSchema.js')
var User = mongoose.model('User', UserSchema)

module.exports = User