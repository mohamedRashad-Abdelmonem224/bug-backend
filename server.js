const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

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