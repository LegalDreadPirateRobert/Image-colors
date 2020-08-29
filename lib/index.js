const fs = require('fs')
const path = require('path')
var Table = require('cli-table');
const chalk = require('chalk');
const getColors = require('get-image-colors')
const { GetColorName }  = require('hex-color-to-color-name');
const  { DEFAULT }  = require("../constant");


class ImageColor {
    
    constructor(){
        this.colorCount = 0;
        this.table = [];
        this.options = [];
        this.getFile();
        this.getColor();
    }

    getFile(){
        const args = process.argv;
        const options = this.verifyArgument(args);
        return this.configure();
    }

    configure(){
        const white = (text) => chalk.bold.rgb(255, 255, 255)(text);
        var table = new Table({
            head: [
                white('Color'),
                white('Hex'),
                white('Rgb'),
            ]
        });
        this.table = table;
    }
    
    rgbColors(rgb){
        return rgb
                .split("")
                .slice(4)
                .reverse()
                .slice(1)
                .reverse()
                .join("")
                .split(",");
    }

    getColor(){
        var stats = fs.statSync(this.options.filePath);
        if(stats.isDirectory() && !stats.isFile())this.throwError()
        
        fs.readFile(this.options.filePath, (function(err, image) {
            if (err) throw err;
            const options  = this.options;
            getColors(image,options).then((colors,err) => {
                colors.map(color => {
                    const c = this.rgbColors(color.css())
                    const colorText = (text) => chalk.rgb(c[0],c[1], c[2]).bold(text); 
                    const hex = color.hex();
                    const rgb = color.css();
                    const name = GetColorName(color.hex()); 
                    this.table.push([colorText(name),colorText(hex),colorText(rgb)]);
                });
                console.log(this.table.toString())
            }).catch((err)=>console.log(err))
        }).bind(this));
    }

    verifyArgument(args){
        if(args.length < 3 ) throw new Error("file not specificed");
        const filePath = args[2];
        const options = {
            filePath,
            count:this.getCount(args),
            type:this.getFileType(filePath)
        };
        this.options = options;
    }
    
    getFileType(file){
        const idx = file.split("").reverse().indexOf(".")
        if(idx == -1)this.throwError();
        const fileType = file.split("").slice().reverse().slice(0,idx).reverse().join("");
        switch(fileType){
            case "jpg":
                return "image/jpg";
            case "png":
                return "image/png";
            default:
                this.throwError();
        }
        this.throwError();
    }

    getCount(args){
        const count = args.length > 3 && Number(args[3]) != NaN ? Number(args[3]):DEFAULT;
        return count;
    }
    throwError(){
        throw new Error(" ( file ) does not exist")
    }
}


new ImageColor()

exports.ImageColor = ImageColor;