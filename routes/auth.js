const Authentication = require('../controllers/authentication')
const { requireAuth, requireSignIn } = require('../middlewares/auth')

module.exports = (app) => {
  app.post('/signup', Authentication.signup)
  app.post('/signin', requireSignIn, Authentication.signin)
  app.get('/protected', requireAuth, (req, res) => {
    res.send({ message: 'You are successfully authenticated if you see me' })
  })
  app.get('/', (req, res) => {
    res.send({ health: 'Alive' })
  })
}
