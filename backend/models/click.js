const mongoose = require('mongoose')

const clickSchema = new mongoose.Schema({
    urlId: {
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
    languages: [
        {
            type: String
        }
    ]
}, {
    timestamps: { createdAt: 'createdAt' }
})

const Click = mongoose.model('Click', clickSchema)

module.exports = Click
