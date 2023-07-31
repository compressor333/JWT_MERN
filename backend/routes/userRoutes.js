const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {
    getMe,
    createUser,
    verifyUser,
} = require('../controllers/userController')
const cors = require('cors')
router.route('/').get(protect, getMe).post(createUser)
router.route('/login').post(verifyUser)

module.exports = router