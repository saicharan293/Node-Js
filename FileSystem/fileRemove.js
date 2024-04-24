const fs=require('node:fs')

fs.unlink('hi.txt',function(err){
    if(err) console.error(err)
    else console.log("File removed successfully")
})