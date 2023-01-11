const bodyParser = require('body-parser')
const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors')
const fileUpload = require('express-fileupload')
const axios = require('axios')

// Express App
const app = express()

app.use(cors())

// DB Connection
connectDB()

// Middlewares
app.use('/images', express.static('images'))
app.use(bodyParser.json())
app.use(fileUpload())

// Routes
const userRoutes = require('./routes/userRoutes.route')
const subjectRoutes = require('./routes/subjectRoutes.route')
const monthRoutes = require('./routes/monthRoutes.route')

app.use('/api/', userRoutes)
app.use('/api/subjects/', subjectRoutes)
app.use('/api/months/', monthRoutes)

// Listening App To Server
const PORT = process.env.PORT

app.listen(PORT || 5000, () => {
  console.log(`Server started on port: ${PORT}`)
})
