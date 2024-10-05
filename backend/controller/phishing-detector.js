const { predict } = require('../util/onnx')

const router = require('express').Router()

router.get('/', async (req, res) => {
    const url = req.body.url
    const result = await predict(url)
    res.json(result)
})

module.exports = router