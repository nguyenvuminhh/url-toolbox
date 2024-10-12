const { findOne, click } = require('../service/url')
const { checkAvailability } = require('../util/helper')
const router = require('express').Router()

router.get('/:url', async (req, res) => {
    const url = req.params.url
    const urlObject = await findOne({ url })
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
    const referer = req.headers.referer || req.headers.referrer
    const host = req.header.host
    const language = req.headers['accept-language']
    await click({
        url: urlObject._id,
        userAgent,
        ipv4,
        ipv6,
        referer,
        host,
        language
    })
    res.redirect(longUrl)
})

module.exports = router