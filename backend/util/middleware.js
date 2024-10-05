const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../util/config')
const User = require('../models/user')

const requestLogger = (req, res, next) => {
    console.log('-----------------------')
    console.log('DATE: ', new Date())
    console.log('METHOD: ', req.method)
    console.log('BODY: ', req.body)
    console.log('PATH: ', req.path)
    next()
}

const errorHandler = (error, req, res, next) => {
    res.status(400).json({ error: error.message })
    next(error)
}

const tokenExtractor = async (req, res, next) => {
    const auth = req.headers.authorization
    console.log(auth)
    if (!auth || !auth.startsWith('Bearer ')) {
        res.status(500).json({ error: 'Authorization failed!' })
        return
    }
    req.token = auth.substring(7)
    next()
}

const currentUserExtractor = async (req, res, next) => {
    const decodedToken = await jwt.verify(req.token, JWT_SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
        res.status(500).json({ error: 'Authorization failed.' })
        return
    }
    req.currentUser = {
        id: user._id,
        username: user.username,
        name: user.name,
    }

    next()
}


module.exports = { errorHandler, tokenExtractor, currentUserExtractor, requestLogger }