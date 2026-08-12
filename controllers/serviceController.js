const Service = require('../models/Service')

exports.listServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 })
    res.json(services)
  } catch (err) {
    next(err)
  }
}
