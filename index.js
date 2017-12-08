const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const mongoURI = require('./config/keys').mongoURI
const app = express()

// DB Setup
mongoose.connect(mongoURI, { useMongoClient: true })

// App setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))

// Routes
require('./routes/auth')(app)

// Server setup
const port = process.env.PORT || 3080
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on port', port)
