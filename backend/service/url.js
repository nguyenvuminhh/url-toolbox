const Click = require("../models/click")

const Url = require("../models/url")

const findOne = async (info) => {
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

const click = async (info) => {
    const url = await Url.findByIdAndUpdate(info.url, { $inc: { clicks: 1 } }, { new: true, runValidators: true})
    const newClick = new Click(info)
    await newClick.save()
    console.log(url);
    
    url.clickInfo.push(newClick)
    await url.save()
    return newClick
}

module.exports = { findOne, addNewUrl, deactivate, reactivate, click}