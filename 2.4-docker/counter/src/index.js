const express = require('express')
const redis = require('redis')

const PORT = process.env.PORT || 3000
const STORAGE_URL = process.env.STORAGE_URL || 'localhost'

const app = express()
const client = redis.createClient(`redis://${STORAGE_URL}`)

const store = {}

app.get('/:name', (req, res) => {
    const {name} = req.params

    if (!(name in store)) store[name] = 0
    store[name] += 1

    client.incr(name, (err, rep) => {
        if(err) {
            res.status(500).json(err)
        } else {
            res.json({
                'stor': store[name],
                'redis': rep,
            })

        }
    })
    
})

app.listen(PORT, ()=>{
    console.log(`server port: ${PORT}`)
})