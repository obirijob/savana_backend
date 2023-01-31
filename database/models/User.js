/** @format */

const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  name: String,
  picture: String,
  username: { type: String, unique: true },
  email: String,
})

module.exports = mongoose.model('user', userSchema)
