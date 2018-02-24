const url = require('url')

module.exports = (req, res, next) => {
  if (req.method === 'POST') {
    req.URL = url.format({
      protocol: req.protocol,
      host: req.get('host')
    })
  }
  next()
}
