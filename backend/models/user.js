const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Invalid name. Only letters and spaces are allowed.'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [16, 'Username cannot exceed 16 characters'],
        match: [/^[a-zA-Z0-9._]{3,16}$/, 'Invalid username']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address'], // Email regex validation
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [
          /^\d{10}$/, 'Phone number should have 10 digits',
        ],
    },
    passwordHash: {
        type: String,
        required: [true, 'Password is required'],
    }, 
    totalSpent: {
        type: Number,
        default: 0
    },
    urls: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'url'
        }
    ],
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

const User = mongoose.model('User', userSchema)

module.exports = User