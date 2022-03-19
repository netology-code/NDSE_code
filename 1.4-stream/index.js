const fs = require('fs')

const  readerStream = fs.createReadStream('package.json')

let data
readerStream
.setEncoding('UTF8')
.on('data', (chank) =>{
    data += chank
})
.on('end', () => {
    console.log('end', data)
})

const content = 'content \n'

const writerSrt = fs.createWriteStream('output.txt')
writerSrt.write(content, 'UTF8')
writerSrt.end()

writerSrt.on('finish', () => {
    console.log('finish')
})

writerSrt.on('close', () => {
    console.log('close')
})

writerSrt.on('error', () => {
    console.error('error')
})

let readStr1 = fs.createReadStream('package.json')
let writeSrt2 = fs.createWriteStream('output.txt')

readStr1.pipe(writeSrt2)
