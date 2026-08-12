const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String },
  excerpt: { type: String },
  content: { type: String },
  cover: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('BlogPost', postSchema)
