const router = require('express').Router()
const teamController = require('../controllers/teamController')

router.get('/', teamController.listTeam)

module.exports = router
