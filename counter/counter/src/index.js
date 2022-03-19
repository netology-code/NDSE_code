const express = require('express')
const redis = require('redis')

const PORT = process.env.PORT || 3000
const STORAGE_URL = process.env.STORAGE_URL || 'localhost'

const app = express()
const client = redis.createClient(`redis://${STORAGE_URL}`)

const stor = {}

app.get('/:name', (req, res) => {
    const {name} = req.params

    if(!(name in stor)) stor[name] = 0
    stor[name] += 1

    client.incr(name, (err, rep) => {
        if(err){
            res.status(500).json(client)
        } else {
            res.json({
                'stor': stor[name],
                'redis': rep,
            })
        }
    })

})

app.listen(PORT, () => {
    console.log(`server PORT: ${PORT}`)
})

