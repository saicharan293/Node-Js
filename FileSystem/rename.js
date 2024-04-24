const fs=require('node:fs')

fs.rename('hello.txt','hi.txt',function(err){
    if(err) console.error(err)
    else console.log("rename operation successfully")
})