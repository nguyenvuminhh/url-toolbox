const { findOne, click } = require('../service/url')

const router = require('express').Router()

router.get('/:url', async (req, res) => {
    const url = req.params.url
    const urlObject = await findOne({ url })
<<<<<<< HEAD
    checkAvailability("Status: 404 | URL not found.", [urlObject])
    if (urlObject.deactivated) {
        throw Error("Status 404 | URL not found.")
    }
=======
>>>>>>> parent of 30a6a5d4 (fine-tune redirector. debug express-async-error)
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
    res.redirect(longUrl)
})

module.exports = router