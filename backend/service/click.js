const { default: axios } = require('axios')
const Click = require('../models/click')
const Url = require('../models/url')
const { languageStringProcessor, ipapiLink } = require('../util/helper')

const click = async (info) => {
    const url = await Url.findByIdAndUpdate(info.urlId, { $inc: { clicks: 1 } }, { new: true, runValidators: true})
    const newClick = new Click(info)
    await newClick.save()
    url.clickInfo.push(newClick)
    await url.save()
    console.log(url)
    return newClick
}

const addLanguages = async (info) => {
    const { languages, urlObject } = info
    const processedLanguages = languageStringProcessor(languages)

    for (const item of processedLanguages) {
        const currentValue = urlObject.userLanguages.get(item) || 0
        urlObject.userLanguages.set(item, currentValue+1)
    }
    await urlObject.save()
}


const addReferer = async (info) => {
    const { referer, urlObject } = info
    if (!referer) {
        return
    }
    const currentValueReferer = urlObject.referers.get(referer) || 0
    urlObject.referers.set(referer, currentValueReferer+1)
    await urlObject.save()
}

const getAddress = async (info) => {
    const link = ipapiLink(info.ipv4)
    //const res = await axios.get(link)
    console.log(link)
    return {
        country: 'Vietnam', //res.data.country_name,
        city: 'Hanoi', //res.data.city,
        region: 'Hanoi' //res.data.region_name
    }
}

const addRegion = async (info) => {
    const { ipv4, urlObject } = info
    const { country, region, city } = await getAddress({ ipv4 })
    const cityAndRegion = country + '-' + city + ' (' + region + ') '
    const currentValueCountry = urlObject.countries.get(country) || 0
    urlObject.countries.set(country, currentValueCountry+1)
    const currentValueCity = urlObject.cities.get(cityAndRegion) || 0
    urlObject.cities.set(cityAndRegion, currentValueCity+1)
    await urlObject.save()
}



module.exports = { click, addLanguages, getAddress, addRegion, addReferer }