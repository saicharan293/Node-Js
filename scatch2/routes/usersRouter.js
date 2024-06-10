const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('chey user router 1')
})

module.exports=router;