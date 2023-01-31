/** @format */

const mongoose = require('mongoose')

var albumSchema = new mongoose.Schema({
  userId: String,
  albumTitle: String,
})

module.exports = mongoose.model('album', albumSchema)
