const { addRegion, addLanguages, click } = require('../service/click')
const { findOneURL } = require('../service/url')
const { checkAvailability, extractDomainName } = require('../util/helper')
const router = require('express').Router()

router.get('/:url', async (req, res) => {
    const url = req.params.url
    const urlObject = await findOneURL({ url })
    checkAvailability("Status: 404 | URL not found.", [urlObject])
    if (urlObject.deactivated) {
        throw Error("Status 404 | URL not found.")
    }
    const longUrl = urlObject.longUrl
    const userAgent = req.header['user-agent']
    const ip = req.ip
    const xForwardedFor = req.headers['x-forwarded-for']
    const ips = xForwardedFor ? xForwardedFor.split(',') : []
    const ipv4 = ips.length > 0 ? ips[0] : ip
    const ipv6 = ip.includes(':') ? ip : null
    console.log(ipv4, ipv6)
    const referer = req.headers.referer || req.headers.referrer
    const extracterReferer = referer ? extractDomainName(referer) : referer
    const host = req.header.host
    const languages = req.headers['accept-language']
    await addLanguages({ languages, urlObject })
    await addRegion({ ipv4, urlObject })
    await click({
        urlId: urlObject._id,
        userAgent,
        ipv4,
        ipv6,
        referer: extracterReferer,
        host,
    })
    res.redirect(longUrl)
})

module.exports = router