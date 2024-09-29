const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                try {
                    new URL(v)
                    return true
                } catch (err) {
                    return false
                }
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shortUrl: {
        type: String,
        unique: true,
        require: true,
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
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Url = mongoose.model('Url', urlSchema)

module.exports = Url