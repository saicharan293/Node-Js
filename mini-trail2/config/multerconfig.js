const multer = require('multer')
const crypto=require('crypto');
const path = require('path');

// disk storage
// export upload    

const storage = multer.diskStorage({
    // folder path set up
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    //file name set up
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        crypto.randomBytes(12,(err,name)=>{
            const fn=name.toString('hex')+path.extname(file.originalname)
            cb(null, fn)
        })
    }
  })
  
const upload = multer({ storage: storage })

module.exports=upload;