const router = require('express').Router()
const { getTrendingTVShow, getSimilarTVShow, getTVShowDetail, getTVShowTrailer, getTVShowByCategory, getTVShowCredit, getTVShowEpisode } = require('../controllers/tv')

router.get('/trending', getTrendingTVShow)
router.get('/trailer/:id', getTVShowTrailer)
router.get('/detail/:id', getTVShowDetail)
router.get('/credit/:id', getTVShowCredit)
router.get('/similar/:id', getSimilarTVShow)
router.get('/:category', getTVShowByCategory)
router.get('/detail/:id/season/:season_number', getTVShowEpisode)

module.exports = router