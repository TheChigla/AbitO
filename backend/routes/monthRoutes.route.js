const router = require('express').Router()
const { authenticateToken } = require('../config/jwt')
const { updateMonth } = require('../controllers/monthController.controller')

router.post('/:key', authenticateToken, updateMonth)

module.exports = router
