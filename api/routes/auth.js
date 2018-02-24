const router = require('express').Router();
const Authentication = require('../controllers/authentication')
const { requireAuth, requireSignIn } = require('../middlewares/auth')

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignIn, Authentication.signin)
router.get('/protected', requireAuth, (req, res) => {
  res.send({ message: 'You are successfully authenticated if you see me' })
})
router.get('/', (req, res) => {
  res.send({ health: 'Alive' })
})

module.exports = router
