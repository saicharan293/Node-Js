const fs=require('fs');

// syntax
// fs.readFile('--file-name','utf8',callback function)

//read file
// fs.readFile('demo.txt','utf8',(err,data)=>{
//     if(err){
//         console.log(err)
//     };
//     console.log(data)
// })

//create and read file
// fs.writeFile('myfile.html','utf8',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("file created successfully")
// })

//update the content
// const content='my name is sai, I m learning files in node js'
// fs.writeFile('myfile.html',content,(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log('file content is added')
// })

//rename the file name
// fs.rename('myfile.html','renamefile.html',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("modification success")
// })

//delete the file
fs.unlink('myfile.html',(err)=>{
    err?console.log(err):console.log("delete success")
    }
)