<<<<<<< HEAD
// @ts-nocheck

// lib import
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

// local import
=======
// IMPORT
require('dotenv').config()
>>>>>>> parent of 30a6a5d4 (fine-tune redirector. debug express-async-error)
const { MONGOOSE_URL } = require('./util/config')
const userRouter = require('./controller/user')
const loginRouter = require('./controller/login')
const urlRouter = require('./controller/url')
const redirector = require('./controller/redirector')
<<<<<<< HEAD
const phishingDetector = require('./controller/phishing-detector')
=======
const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')

const mongoose = require('mongoose')
>>>>>>> parent of 30a6a5d4 (fine-tune redirector. debug express-async-error)
const { errorHandler, requestLogger } = require('./util/middleware')

// mongoose
mongoose.set('strictQuery', false)
mongoose.connect(MONGOOSE_URL)

// middleware and routes
app.use(express.json())
app.use(cors())
app.use(requestLogger)
<<<<<<< HEAD
app.get('/ping', (req, res) => {res.send('pong')})
=======

app.get('/ping', (req, res) => {
    res.send('pong')
})

>>>>>>> parent of 30a6a5d4 (fine-tune redirector. debug express-async-error)
app.use('/api/urls', urlRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/phishing-detector', phishingDetector)
app.use('/', redirector)
app.use(errorHandler)

module.exports = app