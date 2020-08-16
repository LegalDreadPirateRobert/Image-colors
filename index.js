const fs = require('fs')
const path = require('path')
const buffer = fs.readFileSync(path.join(__dirname, 'test.jpg'))
const getColors = require('get-image-colors')
const { GetColorName }  = require('hex-color-to-color-name');
const namedColors = require('color-name-list'); 
const chalk = require('chalk');

function rgbColors(rgb){
    return rgb
            .split("")
            .slice(4)
            .reverse()
            .slice(1)
            .reverse()
            .join("")
            .split(",");
}

getColors(buffer,'image/jpg').then(colors => {
    colors.map(color => {
        console.log(color.hex())
        console.log(GetColorName(color.hex()))
        
        const c = rgbColors(color.css())

        console.log(chalk.rgb(c[0], c[1], c[2]).bold(color.css()))
    })
})

// console.log(chalk.bold.rgb(10, 100, 200)('Hello!'));
