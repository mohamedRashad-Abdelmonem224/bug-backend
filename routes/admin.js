const router = require('express').Router()
const adminController = require('../controllers/adminController')
const auth = require('../middlewares/auth')
const Project = require('../models/Project')
const Contact = require('../models/Contact')

router.post('/login', adminController.login)
router.get('/projects', auth, async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) { next(err) }
})

router.post('/projects', auth, async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (err) { next(err) }
})

router.delete('/projects/:id', auth, async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) { next(err) }
})

router.get('/contacts', auth, async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) { next(err) }
})

module.exports = router
