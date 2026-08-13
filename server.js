const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.8'])

const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const { loginLimiter, contactLimiter, publicLimiter } = require('./middlewares/rateLimiter')

const app = express()

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000', 'http://localhost:3001']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())


app.use(publicLimiter)

app.use('/api/projects', require('./routes/routes'))
app.use('/api/services', require('./routes/services'))
app.use('/api/team', require('./routes/team'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/admin', require('./routes/admin'))
// serve uploaded files (local storage)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))
// uploads route
app.use('/api/uploads', require('./routes/uploads'))

const errorHandler = require('./middlewares/errorHandler')

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(PORT, () => console.log(`Server run on ${PORT}`))
	})
	.catch(err => {
		console.error('DB connection error', err)
		// Start server anyway for local testing (DB may be unavailable)
		app.listen(PORT, () => console.log(`Server run on ${PORT} (DB unavailable)`))
	})

app.use(errorHandler)
