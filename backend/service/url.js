
const Url = require('../models/url')
const User = require('../models/user')
const { languageStringProcessor } = require('../util/helper')

const findOneURL = async (info) => {
    return await Url.findOne({shortUrl: info.url})
}

const addNewUrl = async (info) => {
    const newUrl = new Url(info)
    await newUrl.save()
    await User.findByIdAndUpdate(
        info.owner,
        { $push: { urls: newUrl } },
        { new: true, useFindAndModify: false }
    )
    
    return newUrl
}

const deactivate = async (info) => {
    //TODO: redirect to a page
    await Url.findOneAndUpdate({shortUrl: info.url}, {deactivated: true})
}

const reactivate = async (info) => {
    await Url.findOneAndUpdate({shortUrl: info.url}, {deactivated: false})
}

const analyze = async (info) => {
    const urlObject = await Url.findOne({ shortUrl: info.url }).populate('clickInfo')
    console.log(urlObject.clickInfo)
    const result = {
        countries: urlObject.countries,
        longUrl: urlObject.longUrl,
        shortUrl: urlObject.shortUrl,
        clicks: urlObject.clicks,
        deactivated: urlObject.deactivated,
        userLanguages: urlObject.userLanguages,
        referers: urlObject.referers,
        timeStamps: urlObject.clickInfo.map(a => a.createdAt)
    }
    return result
}

const regionalAnalyze = async (info) => {
    const urlObject = await Url.findOne({ shortUrl: info.url })
    const cities = urlObject.cities.filter(a => a.beginWith(info.region + '-'))
    return cities
}

module.exports = { findOneURL, addNewUrl, deactivate, reactivate, analyze, regionalAnalyze }