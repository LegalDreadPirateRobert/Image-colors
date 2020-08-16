var Table = require('cli-table');
const chalk = require('chalk');

const white = (text) => chalk.bold.rgb(255, 255, 255)(text);
var table = new Table({
    head: [
        white('Color'),
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
const options = {
    count:20,
    type:'image/jpg'
}
getColors(buffer,options).then((colors,err) => {
    colors.map(color => {
        const c = rgbColors(color.css())
        const colorText = (text) => chalk.rgb(c[0],c[1], c[2]).bold(text); 
        const hex = color.hex();
        const rgb = color.css();
        const name = GetColorName(color.hex()); 
        table.push([colorText(name),colorText(hex),colorText(rgb)]);
    });
    console.log(table.toString());
}).catch((err)=>console.log(err))