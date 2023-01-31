/** @format */

const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/users', require('./routes/users'))

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`)
})
