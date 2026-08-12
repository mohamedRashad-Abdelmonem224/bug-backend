const router = require('express').Router()
const projectController = require('../controllers/projectController')

router.get('/', projectController.getProjects)
router.post('/', projectController.createProject)

module.exports = router