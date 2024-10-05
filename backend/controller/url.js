const Url = require('../models/url')
const { addNewUrl, reactivate, deactivate } = require('../service/url')
const { checkAvailability } = require('../util/helper')
const { tokenExtractor, currentUserExtractor } = require('../util/middleware')
const { route } = require('./user')
const router = require('express').Router()

router.get('/', async (req, res) => {
    res.json(await Url.find({}))
})

router.post('/', tokenExtractor, currentUserExtractor, async (req, res) => {
    const { longUrl, shortUrl } = req.body
    console.log(1234);
    
    checkAvailability('Missing long URL or short URL.', [longUrl, shortUrl])
    const newUrlShorten = await addNewUrl({
        longUrl,
        shortUrl,
        owner: req.currentUser.id
    })
    res.status(201).json(newUrlShorten)
})

router.put('/:url', tokenExtractor, currentUserExtractor, async (req, res) => {
    let result
    if (req.body.action == 'reactivate') {
        result = await reactivate(req.params.url)
    } else if (req.body.action == 'deactivate') {
        result = await deactivate(req.params.url)
    } else {
        result = {error: 'Invalid action'}
    }
    req.json(result)
})

module.exports = router