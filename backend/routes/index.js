const router = require('express').Router()
const protectRoute = require('../middleware/protectRoute')

router.use('/auth', require('./auth'))
router.use('/movie', protectRoute, require('./movie'))
router.use('/tv', protectRoute, require('./tv'))
router.use('/search', protectRoute, require('./search'))

module.exports = router