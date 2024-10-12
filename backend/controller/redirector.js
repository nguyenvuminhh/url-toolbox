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
    const ipAddress = req.ip
    const referer = req.headers.referer || req.headers.referrer
    const host = req.header.host
    const language = req.headers['accept-language']
    await click({
        url: urlObject._id,
        userAgent,
        ipAddress,
        referer,
        host,
        language
    })
    const xForwardedFor = req.headers['x-forwarded-for'];
    const ips = xForwardedFor ? xForwardedFor.split(',') : [];

    // Determine if the IP address is IPv4 or IPv6
    const ipv4 = ips.length > 0 ? ips[0] : ipAddress; // Use the first one from the list
    const ipv6 = ipAddress.includes(':') ? ipAddress : null; // Check if the IP is IPv6
    console.log(ipv4)
    console.log(ipv6)
    res.redirect(longUrl)
})

module.exports = router