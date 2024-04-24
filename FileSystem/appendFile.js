const fs = require('node:fs');

fs.appendFile('hello.txt','\nsecond line is added in this file',function(err){
    if(err) console.error(err)
    else console.log("The next line is added successfully")
})