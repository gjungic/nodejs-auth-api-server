const mongoose  = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

// Define model
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
})

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err) }
      user.password = hash
      next()
    })
  })
})

// Compare passwords
userSchema.methods.comparePassword = function(submittedPassword, callback) {
  bcrypt.compare(submittedPassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }

    callback(null, isMatch)
  })
}

// Create model class
module.exports = mongoose.model('user', userSchema)
