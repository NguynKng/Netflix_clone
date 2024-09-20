const router = require('express').Router()
const {searchContent, getSearchHistory, removeHistoryById} = require('../controllers/search')

router.get('/:content/:query', searchContent)
router.get('/history', getSearchHistory)
router.delete('/history/:id', removeHistoryById)

module.exports = router