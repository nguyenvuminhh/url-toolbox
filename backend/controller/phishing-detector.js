const { predict } = require('../util/onnx')
const { PHISHING_API_URL } = require('../util/config')
const axios = require('axios')
const router = require('express').Router()

router.post('/', async (req, res) => {
    const url = req.body.url    
    const result = await axios.post('http://127.0.0.1:8000/predict', { url });
    res.json(result.data);
})

router.get('/ping', async (req, res) => {
    const result = await axios.get('http://127.0.0.1:8000/ping')
    res.send(result.data)
})

module.exports = router