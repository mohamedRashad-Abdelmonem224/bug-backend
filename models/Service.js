const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  description: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)
