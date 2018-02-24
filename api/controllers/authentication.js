const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../configuration/keys')

const tokenForUser = (userId) => {
  // issued at time
  const iat = new Date().getTime()

  return jwt.sign({ sub: userId, iat }, jwtSecret)
}

exports.signup = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).end('You must provide all required data!')
  }
  try {
    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(409).json({ message: 'Given email already exists!' })
    }

    const userToSave = new User({ email, password })
    const { _id } = await userToSave.save()

    res.header('Path', `${req.URL}/users/${_id}`)
    res.status(201).send({ token: tokenForUser(_id) })
  } catch (err) {
    return res.status(422).send(err)
  }
}
exports.signin = (req, res) => {
  // Already authenticated... Give them a token...
  res.send({ token: tokenForUser(req.user)})
}
