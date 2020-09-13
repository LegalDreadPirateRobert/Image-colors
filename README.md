<p align="center">
  <img width="200px" src="https://images.pexels.com/photos/1174952/pexels-photo-1174952.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" />
  <h2 align="center">Image Color</h2>
  <p align="center">A npm && cmd tool that extracts colors from images</p>
</p>
Image color is an npm package that extracts colors from images,it an also be used a command line tool for extracting colors :) .

## Installation

### project installation
```
npm install --save imagecolor
```
### cmd installation

Inorder to use `imagecolor` as a command line tool you install it globally by running the following command:

```
npm install -g imagecolor
```

## Usage

#### Project usage

```
const {getColor} = require("imagecolor");

const file = { ( absolute || relative ) path to img};

getColor(file).then( (colors) => console.log(colors) ).catch(err=>console.log(err))
```

##### Example

```
const {getColor} = require("imagecolor");

const file = "C:\Users\Pictures\image.jpg";

getColor(file).then( (colors) => console.log(colors) ).catch(err=>console.log(err))
```

##### Output

By default `imagecolor` extracts the first `10` colors and returns the `name`,`hex`,`rgb`. 

```
[
  { name: 'Bronco', hex: '#a7a195', rgb: 'rgb(167,161,149)' },
  { name: 'Shark', hex: '#232529', rgb: 'rgb(35,37,41)' },
  { name: 'Tasman', hex: '#d8dfd7', rgb: 'rgb(216,223,215)' },
  { name: 'Spicy Mix', hex: '#785140', rgb: 'rgb(120,81,64)' },
  { name: 'Roman Coffee', hex: '#816355', rgb: 'rgb(129,99,85)' },
  { name: 'Fiord', hex: '#3d506c', rgb: 'rgb(61,80,108)' },
  { name: 'Submarine', hex: '#c3cbcc', rgb: 'rgb(195,203,204)' },
  { name: 'Soft Amber', hex: '#d5c5b8', rgb: 'rgb(213,197,184)' },
  { name: 'Fun Blue', hex: '#1f429a', rgb: 'rgb(31,66,154)' }
]
```

#### Overiding default color count

To overide default colors of `10` , pass a second argument to the `getColor` function the numbers of colors you want . 

```
getColor(file,5).then( (colors) => console.log(colors) ).catch(err=>console.log(err))
```

##### Output

```
[
  { name: 'Bronco', hex: '#a7a195', rgb: 'rgb(167,161,149)' },
  { name: 'Shark', hex: '#232529', rgb: 'rgb(35,37,41)' },
  { name: 'Tasman', hex: '#d8dfd7', rgb: 'rgb(216,223,215)' },
  { name: 'Spicy Mix', hex: '#785140', rgb: 'rgb(120,81,64)' },
  { name: 'Roman Coffee', hex: '#816355', rgb: 'rgb(129,99,85)' }
]
```



## Options

| Name  | Description                 | Default value |
| ----- | --------------------------- | ------------- |
| file  | Path to file                | REQUIRED      |
| count | numbers of colors to return | 10            |

### cmd usage

To use `imagecolor` as a cmd tool,install globally and run the following command:

```
getImageColor { ( absolute || relative ) path to img}
```

##### Example

```
getImageColor C:\Users\Pictures\image.jpg
```

##### Output

![image color test](https://i.ibb.co/JpVN1bb/public.png)

#### Overiding default color count

To overide default colors of `10` pass the `count` argument of the number of colors you want

```
getImageColor C:\Users\Pictures\image.jpg 15
```

##### output
![image color test 2](https://i.ibb.co/HHTyv5s/public-2.png)
