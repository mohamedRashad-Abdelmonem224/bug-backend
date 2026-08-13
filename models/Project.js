const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  slug: { type: String, index: true, unique: false },
  category: { type: String },
  categoryLabel: { type: String },
  tagline: { type: String },
  year: { type: String },
  client: { type: String },
  featured: { type: Boolean, default: false, index: true },
  summary: { type: String },
  challenge: { type: String },
  solution: { type: String },
  stack: { type: [String], default: [] },
  services: { type: [String], default: [] },
  results: { type: [String], default: [] },
  cover: { type: String },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)
