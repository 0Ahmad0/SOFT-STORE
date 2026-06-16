const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/contactController')
const auth = require('../middleware/auth')

router.get('/', auth, ctrl.getAll)
router.post('/', ctrl.create)
router.patch('/:id/read', auth, ctrl.markRead)
router.delete('/:id', auth, ctrl.remove)

module.exports = router
