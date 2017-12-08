const User = require('../models/user')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/keys').jwtSecret

const tokenForUser = (user) => {
  // issued at time
  const iat = new Date().getTime()

  return jwt.sign({ sub: user.id, iat }, jwtSecret)
}

exports.signup = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).end('You must provide all required data!')
  }
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(422).end('Given email already exists!')
    }

    const userToSave = new User({ email, password })
    const savedUser = await userToSave.save()

    res.status(201).send({ path: `/users/${savedUser._id}`, token: tokenForUser(savedUser) })
  } catch (err) {
    return res.status(422).send(err)
  }
}
exports.signin = (req, res) => {
  // Already authenticated... Give them a token...
  res.send({ token: tokenForUser(req.user)})
}
