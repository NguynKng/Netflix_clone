const router = require("express").Router()
const authControllers = require('../controllers/auth')
const protectRoute = require('../middleware/protectRoute')

router.post('/signup', authControllers.signup)
router.post('/login', authControllers.login)
router.post('/logout', authControllers.logout)
router.get('/authCheck', protectRoute, authControllers.authCheck)

module.exports = router