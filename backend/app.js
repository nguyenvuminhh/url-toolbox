// @ts-nocheck

// lib import
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// local import
const { MONGOOSE_URL } = require('./util/config')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const urlRouter = require('./controller/url')
const redirector = require('./controller/redirector')
const phishingDetector = require('./controller/phishing-detector')
const { errorHandler, requestLogger } = require('./util/middleware')

// mongoose
mongoose.set('strictQuery', false)
mongoose.connect(MONGOOSE_URL)

// middleware and routes
app.use(express.json())
app.use(cors())
app.use(requestLogger)
app.get('/ping', (req, res) => {res.send('pong')})
app.use('/api/urls', urlRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/phishing-detector', phishingDetector)
app.use('/', redirector)
app.use(errorHandler)

module.exports = app