const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  bio: { type: String },
  avatar: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('TeamMember', teamSchema)
