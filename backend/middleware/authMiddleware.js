const jwt = require('jsonwebtoken')

const Users = require('../models/userModel')

const protect = async (req, res, next) => {
  console.log('protect')
  try {
    let token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await Users.findById(decoded.id).select('-password')
      if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { protect }