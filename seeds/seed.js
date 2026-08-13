const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const mongoose = require('mongoose')
const Admin = require('../models/Admin')
require('dotenv').config()

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✓ Connected to MongoDB')
    
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USER })
    
    if (existingAdmin) {
      console.log('✓ Admin already exists. No changes made.')
      process.exit(0) 
    }

   
    const admin = await Admin.create({
      username: process.env.ADMIN_USER,
      password: process.env.ADMIN_PASS
    })

    console.log('✓ Admin created successfully')
    console.log(`Username: ${process.env.ADMIN_USER}`)
    
    process.exit(0)
  } catch (err) {
    console.error(' Error:', err.message)
    process.exit(1)
  }
}

seedAdmin()
