/** @format */
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../database/models/User')

dotenv.config()

module.exports = async function (req, res, next) {
  const token = req.headers['token']
  if (!token) {
    return res.status(500).json('No token provided')
  }
  try {
    let payload = await jwt.decode(token, process.env.SECRET)
    if (payload) {
      // check if user exists in db
      const usr = await User.findOne({ email: payload.email })
      if (usr) {
        req.user = payload
        return next()
      } else {
        return res.status(404).json('user not found!')
      }
    } else {
      return res.status(500).json('Bad Payloads')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}
