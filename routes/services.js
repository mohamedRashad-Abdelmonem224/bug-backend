const router = require('express').Router()
const serviceController = require('../controllers/serviceController')

router.get('/', serviceController.listServices)

module.exports = router
