/** @format */
const dotenv = require('dotenv')
dotenv.config()

var mongoose = require('mongoose')

var mongoDB = process.env.MONGO_DB
mongoose.set('strictQuery', true)
mongoose.connect(mongoDB, { useNewUrlParser: true })

var db = mongoose.connection

db.on('error', err => {
  console.log(err)
})
