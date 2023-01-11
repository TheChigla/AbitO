const router = require('express').Router()
const { authenticateToken } = require('../config/jwt')
const {
  getCurrency,
  addSubject,
  removeSubject,
} = require('../controllers/subjectController.controller')

router.post('/:id', authenticateToken, addSubject)
router.get('/currency', getCurrency)
router.delete('/:subject', authenticateToken, removeSubject)

module.exports = router
