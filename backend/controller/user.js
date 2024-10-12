

const router = require('express').Router()
const User = require('../models/user')
const { getAllUsers, createNewUser, editUserBasic, editUserPassword } = require('../service/user')
const { checkAvailability } = require('../util/helper')
const { tokenExtractor, currentUserExtractor } = require('../util/middleware')
router.get('/', async (req, res) => {
    const data = await getAllUsers() // TODO
    res.json(data)
})

router.post('/', async (req, res) => {
    // basic info: name, username, password, DOB, phone
    const body = req.body
    const newUser = await createNewUser(body)
    res.status(201).json(newUser)
})

const singleRouter = require('express').Router()

const userExtractor = async (req, res, next) => {
    let user
    if (req.params.id === 'current') {
        user = await User.findById(req.currentUser.id)
    } else {
        user = await User.findById(req.params.id)
    }
    checkAvailability('User not found.', [user])
    req.user = user
    next()
}

router.delete('/', async (req, res) => {
    await User.deleteMany({})
    res.status(200)
})

singleRouter.put('/editBasic', async (req, res) => {
    const body = req.body
    const result = await editUserBasic(req.user, body)
    res.json(result)
})

singleRouter.put('/editPassword', async (req, res) => {
    const body = req.body
    const result = await editUserPassword(req.user, body)
    res.json(result)
})

singleRouter.get('/', async (req, res) => {
    res.json(req.user)
})

router.use('/:id', tokenExtractor, currentUserExtractor, userExtractor, singleRouter)

module.exports = router