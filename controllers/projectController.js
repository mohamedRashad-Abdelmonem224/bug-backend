const Project = require('../models/Project')

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    next(err)
  }
}

exports.createProject = async (req, res, next) => {
  try {
    const data = { ...req.body }
    if (data.images && Array.isArray(data.images) && data.images.length > 0 && !data.cover) {
      data.cover = data.images[0]
    }
    const project = await Project.create(data)
    res.status(201).json(project)
  } catch (err) {
    next(err)
  }
}
