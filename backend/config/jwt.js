const jwt = require('jsonwebtoken')
const User = require('../models/userModel.model')

const authenticateToken = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findOne({ email: decoded.email }).select(
        '-password'
      )

      next()
    } catch (err) {
      res.status(401)
      res.json({ err, msg: 'Not Authorized' })
    }
  }

  if (!token) {
    res.status(401)
    res.json('Not Authorized')
  }
}

module.exports = { authenticateToken }
