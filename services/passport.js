const passport = require('passport')
const User = require('../models/user')
const jwtSecret = require('../config/keys').jwtSecret
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy

// Setup options for Local Strategy
const localOptions = {
  usernameField: 'email'
}

// Create Local Strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const foundUser = await User.findOne({ email })
    if (!foundUser) { return done(null, false) }
    // Compare passwords
    foundUser.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false) }

      done(null, foundUser)
    })
  } catch (err) {
    done(err)
  }
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: jwtSecret
}

// Create JWT Strategy
const jwtVerify = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const foundUser = await User.findById(payload.sub)
    if (foundUser) { return done(null, foundUser) }

    return done(null, false)
  } catch (err) {
    done(err, false)
  }
})

// Tell Passport to use this Strategy
passport.use(jwtVerify)
passport.use(localLogin)
