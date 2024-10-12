const mongoose = require('mongoose')
const { urlValidator } = require('../util/helper')


const regionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true }
});

const countriesSchema = new mongoose.Schema({
    count: { type: Number, required: true },
    regions: {
        type: Map,
        of: regionSchema
    }
});

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
            ref: 'ClickInfo'
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url

// countries: {
//     count: Number,
//     regions: {
//         regionName: Number,
//         regionName: Number,
//         regionName: Number,
//         regionName: Number
//     }
// }