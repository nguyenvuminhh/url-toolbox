const { PHISHING_API_URL } = require('../util/config')
const axios = require('axios')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const url = req.body.url    
    const result = await axios.post(PHISHING_API_URL + '/predict', { url })
    res.json(result.data)
})

router.get('/ping', async (req, res) => {
    const result = await axios.get(PHISHING_API_URL + '/ping')
    res.send(result.data)
})

module.exports = router