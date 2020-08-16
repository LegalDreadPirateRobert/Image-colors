const fs = require('fs')
const path = require('path')
const buffer = fs.readFileSync(path.join(__dirname, 'test.jpg'))
const getColors = require('get-image-colors')

getColors(buffer,'image/jpg').then(colors => {
    colors.map(color => {
        console.log(color.hex())
        console.log(color.css())
    })
})

