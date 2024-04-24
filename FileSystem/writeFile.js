const fs = require('node:fs');

// Writing in a file
fs.writeFile('hello.txt','this is hello text file',function(err){
    if(err) console.error(err)
    else console.log("write operation done successfully")
})