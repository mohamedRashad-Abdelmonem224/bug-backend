const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  service: { type: String },
  notifyMethod: { type: String, enum: ['email', 'whatsapp', 'both'], default: 'email' },
  budget: { type: String },
  projectDetails: { type: String },
  message: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)
