const { IPAPI_API_KEY } = require("./config")
const { parse } = require('tldts')

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

const languageStringProcessor = (languageString) => {
    const languageArray = languageString.split(',')
    const result = []
    for (let i = 0; i < languageArray.length; i++) {
        const language = languageArray[i].substring(0, 2)
        const fullLanguageName = new Intl.DisplayNames(['en'], { type: 'language' }).of(language)
        if (!result.includes(fullLanguageName)) {
            result.push(fullLanguageName)
        }
    }
    return result
}

const ipapiLink = (ip) => {
    return "http://api.ipapi.com/api/" + ip + "?access_key=" + IPAPI_API_KEY
}

const extractDomainName = (url) => {
    const parsed = parse(url)
    return parsed.domainWithoutSuffix
}

module.exports = { checkAvailability, arrayUniqueValidator, urlValidator, languageStringProcessor, ipapiLink, extractDomainName }