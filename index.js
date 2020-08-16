var Table = require('cli-table');
const chalk = require('chalk');

const white = (text) => chalk.bold.rgb(255, 255, 255)(text);
var table = new Table({
    head: [
        white('Color Name'),
        white('Hex'),
        white('Rgb'),
    ]
});

const fs = require('fs')
const path = require('path')
const buffer = fs.readFileSync(path.join(__dirname, 'test.jpg'))
const getColors = require('get-image-colors')
const { GetColorName }  = require('hex-color-to-color-name');
const namedColors = require('color-name-list'); 


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

let colors = [];
getColors(buffer,'image/jpg').then((colors,err) => {
    colors.map(color => {
        const hex = color.hex();
        const rgb = color.css();
        const name = GetColorName(color.hex()); 

        const c = rgbColors(color.css())
        const ColorName = chalk.rgb(c[0], c[1], c[2]).bold(name)
        table.push([ColorName,hex,rgb])
    });
    console.log(table.toString());
}).catch((err)=>console.log(err))