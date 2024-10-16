//import os module
const os=require('os');
const path=require('path');

//gives os type in the pc
// console.log(os.type())

//gives version of pc
// console.log(os.version())

//gives free memory present in os
// console.log(os.freemem())

//gives cpu status
// console.log(os.cpus())

//current directory
// console.log(__dirname)

//current file
// console.log(__filename)

//complete path of file
console.log(path.dirname(__filename))

//only current file name
console.log(path.basename(__filename))

//gives extension name of file
console.log(path.extname(__filename))

//complete details of file
// {
//     root: 'D:\\',
//     dir: 'D:\\Downloads\\github\\Node-Js\\TWT-Nodejs',   
//     base: 'sample.js',
//     ext: '.js',
//     name: 'sample'
//   }
console.log(path.parse(__filename))