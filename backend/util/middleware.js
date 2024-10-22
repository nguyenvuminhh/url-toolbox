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
    console.log(error.message)
    if (error.message == 'jwt malformed') {
        res.status(401).json({ error: 'Authorization failed'})
        return
    }
    const code = error.message.substring(7, 10)
    const message = error.message.substring(13)
    res.status(code).json({ error: message })
    next(error)
}

const tokenExtractor = async (req, res, next) => {
    const auth = req.headers.authorization
    if (!auth || !auth.startsWith('Bearer ')) {
        throw Error('Status 401 | Authorization failed')
    }
    req.token = auth.substring(7)
    next()
}

const currentUserExtractor = async (req, res, next) => {
    const decodedToken = await jwt.verify(req.token, JWT_SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) {
        throw Error('Status 401 | Authorization failed')
    }
    req.currentUser = {
        id: user._id,
        username: user.username,
        name: user.name,
    }

    next()
}


module.exports = { errorHandler, tokenExtractor, currentUserExtractor, requestLogger }