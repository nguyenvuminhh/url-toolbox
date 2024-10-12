const mongoose = require('mongoose')

// Define the Click schema
const clickSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Url'
    },
    userAgent: {
        type: String,
    },
    ipv4: {
        type: String,
    },
    ipv6: {
        type: String,
    },
    referer: {
        type: String
    },
    host: {
        type: String,
    },
    language: {
        type: String
    }
}, {
    timestamps: { createdAt: 'createdAt' }
})

// Create a model from the schema
const Click = mongoose.model('Click', clickSchema)

module.exports = Click
