/** @format */

const router = require('express').Router()
const dotenv = require('dotenv')
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const User = require('../database/models/User')
const auth = require('../middlewares/auth')
const fetch = require('node-fetch')

dotenv.config()

router.get('/', auth, async (req, res) => {
  const users = await User.find()
  return res.json(users)
})

router.post('/login-b', async (req, res) => {
  const { access_token } = req.body
  //   try {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
    {
      method: 'GET',
    }
  )

  if (response.ok) {
    let r = await response.json()

    const { email, name, picture } = r
    // get username from email
    const username = email.split('@')[0]

    const stored = await User.findOne({ email })
    if (stored) {
      const { name, email, picture } = stored
      // generate a token for that user
      const token = await jwt.sign(
        { name, email, picture, username },
        process.env.SECRET
      )
      return res.json({ ...stored, token })
    }
    // return res.json(payload)
    const user = new User({
      email,
      picture,
      username,
      name,
    })

    const us = await user.save()

    // generate a token for that user
    const token = await jwt.sign(
      { name, email, picture, username },
      process.env.SECRET
    )
    return res.json({ ...us, token })
  } else {
    let m = await response.text()
    return res.status(400).json(m)
  }
  //   } catch (error) {
  //     return res.status(500).json(error)
  //   }
})

router.post('/login', async (req, res) => {
  try {
    const { client_id, credential } = req.body

    const client = new OAuth2Client(client_id)
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    })
    const { email, name, picture } = ticket.getPayload()
    // get username from email
    const username = email.split('@')[0]

    const stored = await User.findOne({ email })
    if (stored) {
      const { name, email, picture } = stored
      // generate a token for that user
      const token = await jwt.sign(
        { name, email, picture, username },
        process.env.SECRET
      )
      return res.json({ ...stored, token })
    }

    // return res.json(payload)
    const user = new User({
      email,
      picture,
      username,
      name,
    })

    const us = await user.save()

    // generate a token for that user
    const token = await jwt.sign(
      { name, email, picture, username },
      process.env.SECRET
    )
    return res.json({ ...us, token })
  } catch (err) {
    return res.status(500).json(err)
  }
})

router.get('/me', auth, async (req, res) => res.json(req.user))

module.exports = router
