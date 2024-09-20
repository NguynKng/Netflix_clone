const router = require('express').Router()
const { getTrendingTVShow, getSimilarTVShow, getTVShowDetail, getTVShowTrailer, getTVShowByCategory } = require('../controllers/tv')

router.get('/trending', getTrendingTVShow)
router.get('/trailer/:id', getTVShowTrailer)
router.get('/detail/:id', getTVShowDetail)
router.get('/similar/:id', getSimilarTVShow)
router.get('/:category', getTVShowByCategory)

module.exports = router