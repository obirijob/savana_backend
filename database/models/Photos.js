/** @format */

const mongoose = require('mongoose')

var photoSchema = new mongoose.Schema({
  albumId: String,
  photoTitle: String,
  imageUrl: String,
})

module.exports = mongoose.model('photo', photoSchema)
