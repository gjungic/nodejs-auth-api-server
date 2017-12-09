const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const { serverPort, mongoURI } = require('./config/keys')
const app = express()

// DB Setup
mongoose.connect(mongoURI, { useMongoClient: true })

// App setup
app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*' }))

// Routes
require('./routes/auth')(app)

// Server setup
const server = http.createServer(app)
server.listen(serverPort)
console.log('Server listening on port', serverPort)
