const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { checkAvailability } = require('../util/helper')

const getAllUsers = async () => {
    const users = await User.find({})
    return users
}

const createNewUser = async ({ name, username, password, phoneNumber, email }) => {
    checkAvailability('Missing information.', [name, username, password, phoneNumber, email])

    const passwordHash = bcrypt.hashSync(password)
    const newUser = new User({
        name, phoneNumber, username, email, passwordHash
    })
    await newUser.save()
    return newUser
}

const editUserPassword = async (user, payload) => { //TODO: terminate
    checkAvailability('Authentication failed', [bcrypt.compareSync(payload.oldPassword, user.passwordHash)])
    const passwordHash = bcrypt.hashSync(payload.newPassword)
    user.passwordHash = passwordHash 
    await user.save()
    return user
}

const editUserBasic = async (user, payload) => {
    if (payload.name) {
        user.name = payload.name
    }
    if (payload.username) {
        user.username = payload.username
    }
    if (payload.email) {
        user.email = payload.email
    }
    if (payload.phoneNumber) {
        user.phoneNumber = payload.phoneNumber
    }
    await user.save()
    return user
 }

module.exports = { getAllUsers, editUserBasic, editUserPassword, createNewUser }