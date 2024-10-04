const User = require('../models/user')
const { JWT_SECRET } = require('../util/config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { checkAvailability } = require('../util/helper')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    checkAvailability('Status: 400 | Username or password is incorrect.', [user])
    const passwordIsCorrect = bcrypt.compareSync(req.body.password, user.passwordHash)
    checkAvailability('Status: 400 | Username or password is incorrect.', [passwordIsCorrect])
    const userForToken = { username: user.username, id: user.id }
    const token = jwt.sign(userForToken, JWT_SECRET)
    res.json({token, ...userForToken, name: user.name})
})

module.exports = router