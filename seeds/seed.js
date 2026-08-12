const mongoose = require('mongoose')
const Admin = require('../models/Admin')
require('dotenv').config()

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✓ Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    
    if (existingAdmin) {
      console.log('✓ Admin already exists')
      process.exit(0)
    }

    // Create new admin
    const admin = await Admin.create({
      username: process.env.ADMIN_USER || 'admin',
      password: process.env.ADMIN_PASS || 'admin12345'
    })

    console.log('✓ Admin created successfully')
    console.log(`Username: ${process.env.ADMIN_USER}`)
    console.log(`Password: ${process.env.ADMIN_PASS}`)
  
    
    process.exit(0)
  } catch (err) {
    console.error(' Error:', err.message)
    process.exit(1)
  }
}

seedAdmin()
