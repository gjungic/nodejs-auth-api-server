require('../services/passport')
const passport = require('passport')

const sessionOptions = { session: false }

exports.requireAuth = passport.authenticate('jwt', sessionOptions)
exports.requireSignIn = passport.authenticate('local', sessionOptions)
