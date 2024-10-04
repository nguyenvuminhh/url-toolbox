const { findOne, click } = require('../service/url')
const { checkAvailability } = require('../util/helper')

const router = require('express').Router()

router.get('/:url', async (req, res) => {
    const url = req.params.url
    console.log("REQQQQQQQQQQQQQQ:", req.headers)
    const urlObject = await findOne({ url })
    checkAvailability("Status: 400 | Unbinded URL.", [urlObject])
    const longUrl = urlObject.longUrl
    const userAgent = req.headers['user-agent']
    const ipAddress = req.ip
    const referer = req.headers.referer || req.headers.referrer
    const host = req.headers.host
    const language = req.headers['accept-language']
    await click({
        url: urlObject._id,
        userAgent,
        ipAddress,
        referer,
        host,
        language
    })
    res.redirect(longUrl)
})

module.exports = router