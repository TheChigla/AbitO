const router = require('express').Router()
const { authenticateToken } = require('../config/jwt')
const {
  registerUser,
  loginUser,
  getUser,
} = require('../controllers/userController.controller')

router.get('/', authenticateToken, getUser)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

module.exports = router
