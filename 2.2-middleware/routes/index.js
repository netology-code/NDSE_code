const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const {url} = req
    res.json({url})
})

module.exports = router