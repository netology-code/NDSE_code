const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file')

router.post('/upload-img', 
    fileMulter.single('cover-img'),
    (req, res) => {
        if(req.file){
            const {path} = req.file
            res.json({path})
        }
        res.json()
    })

module.exports = router