const router = require('express').Router()
const {searchContent, getSearchHistory, removeHistoryById, removeAllHistory} = require('../controllers/search')

router.get('/:content/:query', searchContent)
router.get('/history', getSearchHistory)
router.delete('/history', removeAllHistory)
router.delete('/history/:id', removeHistoryById)

module.exports = router