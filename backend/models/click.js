const mongoose = require('mongoose')

// Define the Click schema
const clickSchema = new mongoose.Schema({
    url: { //check
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Url'
    },
    userAgent: {
        type: String,
    },
    ipAddress: { //half check
        type: String,
    },
    referer: { //check
        type: String
    },
    host: {
        type: String,
    },
    language: { //check
        type: String
    }
}, {
    timestamps: { createdAt: 'createdAt' }
})

// Create a model from the schema
const Click = mongoose.model('Click', clickSchema)

module.exports = Click
