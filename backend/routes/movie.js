const router = require('express').Router()
const { getTrendingMovie, getMovieTrailer, getMovieDetail, getSimilarMovies, getMoviesByCategory, getMovieCredit } = require('../controllers/movie')

router.get('/trending', getTrendingMovie)
router.get('/trailer/:id', getMovieTrailer)
router.get('/detail/:id', getMovieDetail)
router.get('/credit/:id', getMovieCredit)
router.get('/similar/:id', getSimilarMovies)
router.get('/:category', getMoviesByCategory)


module.exports = router