const fs=require("node:fs")

fs.rm("./copy",function(err){
    if(err) console.error(err)
    else console.log("Folder is removed successfully")
})