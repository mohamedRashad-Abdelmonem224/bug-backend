const router = require('express').Router()
const contactController = require('../controllers/contactController')
const { contactLimiter } = require('../middlewares/rateLimiter')

router.post('/', contactLimiter, contactController.createContact)

module.exports = router
