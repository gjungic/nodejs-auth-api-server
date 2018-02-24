const http = require('http')
const app  = require('./api')
const { serverPort } = require('./api/configuration/keys')

// Server setup
const server = http.createServer(app)
server.listen(serverPort, () => {
  console.log('Server listening on port', serverPort)
})
