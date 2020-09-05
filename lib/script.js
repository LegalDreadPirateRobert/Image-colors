const fs = require('fs')
const getColors = require('get-image-colors')
const { GetColorName }  = require('hex-color-to-color-name');


class ImageColor {

    static getColor(filePath,options,resolve,reject){
        var stats = fs.statSync(filePath);
        if(stats.isDirectory() && !stats.isFile())this.throwError()
        const listOfColors = [];
        fs.readFile(filePath, (function(err, image) {
            if (err) throw err;

            getColors(image,options).then((colors,err) => {
                colors.map(color => {
                    const newColor = {
                        "name":GetColorName(color.hex()), 
                        "hex":color.hex(),
                        "rgb":color.css(),
                    };
                    listOfColors.push(newColor);
                });
                resolve(listOfColors);
            }).catch((err)=>reject(err));
        }).bind(this));
    }

}

function getColor(file,options){
    return new Promise( (resolve,reject) => {
        options = {
            count: options.count ? options.count:10,
            type: options.type ? options.type:'image/jpg'
        }
        ImageColor.getColor(file,options,resolve,reject);
    });
}

exports.getColor = getColor;