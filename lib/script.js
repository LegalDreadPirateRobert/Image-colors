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

function getFileType(file){
    const fileTypeOne = file.split("").reverse().slice(0,3).reverse().join("");
    const jpeg = file.split("").reverse().slice(0,4).reverse().join("");
    
    let fileType = null;

    switch(fileTypeOne){
        case 'jpg':
            fileType = "image/jpg";
            break;
        case 'png':
            fileType = "image/png";
            break;
        default:
            if(jpeg == "jpeg")
                fileType = "image/jpeg";
            break;
    }
    
    if(!fileType) throw new Error("invalid file");
    
    return fileType;
}

function getColor(file,count){
    return new Promise( (resolve,reject) => {
        options = {
            count: count ? count:10,
            type: getFileType(file)
        }
        ImageColor.getColor(file,options,resolve,reject);
    });
}

exports.getColor = getColor;