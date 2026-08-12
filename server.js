const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.8'])

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const { loginLimiter, contactLimiter, publicLimiter } = require('./middlewares/rateLimiter')

const app = express()

// CORS configuration - حماية من الـ doomains غير المصرح بيها
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())

// Apply rate limiting
app.use(publicLimiter)

app.use('/api/projects', require('./routes/routes'))
app.use('/api/services', require('./routes/services'))
app.use('/api/team', require('./routes/team'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))

const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server run on ${PORT}`))
	})
	.catch(err => {
		console.error('DB connection error', err)
		process.exit(1)
	})

app.use(errorHandler)