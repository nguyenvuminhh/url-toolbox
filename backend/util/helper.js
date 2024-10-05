const checkAvailability = (message, items) => {
    for (let i = 0; i < items.length; i++) {
        if (!items[i]) {
            throw Error(message)
        }
    }
}

const arrayUniqueValidator = (value) => {
    return new Set(value).size === value.length
}

const urlValidator = (url) => {
    try {
        new URL(url)
        return true
    } catch (err) {
        return false
    }
}


module.exports = { checkAvailability, arrayUniqueValidator, urlValidator }