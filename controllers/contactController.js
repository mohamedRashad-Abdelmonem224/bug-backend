const Contact = require('../models/Contact')

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone, service, budget, projectDetails, message, notifyMethod } = req.body
    if (!name || !email || (!message && !projectDetails)) {
      return res.status(400).json({ error: 'name, email and message or projectDetails are required' })
    }
    const contact = await Contact.create({ name, email, phone, service, budget, projectDetails, message, notifyMethod })
    res.status(201).json({ ok: true, contact })
  } catch (err) {
    next(err)
  }
}
