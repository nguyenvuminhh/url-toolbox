
const Url = require("../models/url")
const { languageStringProcessor } = require("../util/helper")

const findOneURL = async (info) => {
    return await Url.findOne({shortUrl: info.url})
}

const addNewUrl = async (info) => {
    const newUrl = new Url(info)
    await newUrl.save()
    return newUrl
}

const deactivate = async (info) => {
    //TODO: redirect to a page
    await Url.findOneAndUpdate({shortUrl: info.url}, {deactivated: true})
}

const reactivate = async (info) => {
    await Url.findOneAndUpdate({shortUrl: info.url}, {deactivated: false})
}


module.exports = { findOneURL, addNewUrl, deactivate, reactivate }