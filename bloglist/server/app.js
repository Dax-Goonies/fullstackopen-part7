// Imports & Requirements
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const testingRouter = require('./controllers/testing')
const path = require('path')

// App setup
const app = express()

// Logger
logger.info('Connecting to', config.MONGODB_URI)

// MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB', error.message)
  })

// Start app
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)

// Testing route for resetting the database
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

// Serving the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
