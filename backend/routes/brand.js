const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/brandController')
const auth = require('../middleware/auth')

router.get('/', ctrl.get)
router.put('/', auth, ctrl.update)

module.exports = router
