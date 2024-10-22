const mongoose = require('mongoose')
const { urlValidator } = require('../util/helper')


const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        validate: {
            validator: urlValidator,
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shortUrl: {
        type: String,
        unique: true,
        required: true,
        validate:{
            validator: (v) => !/\s/.test(v),
            message: 'No space character is allowed'
        },
    },
    clicks: {
        type: Number,
        default: 0
    },
    deactivated: {
        type: Boolean,
        default: false
    },
    clickInfo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Click'
        }
    ],
    userLanguages: {
        type: Map,
        default: {}
    },
    cities: {
        type: Map,
        default: {}
    },
    countries: {
        type: Map,
        default: {}
    },
    referers: {
        type: Map,
        default: {}
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url
