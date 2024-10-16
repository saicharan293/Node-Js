const express=require('express');
const router=express.Router();
const menuModel=require('./../models/Menu');

//post menuModel
router.post('/',async function(req,res){
    try{
      const menuData=req.body;
      const menu=new menuModel(menuData);
      const response=await menu.save();
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal Server Error'})
    }
  })


//get menu
router.get('/',async function(req,res){
    try{
      const menu=await menuModel.find();
      console.log('menu fetched');
      res.status(200).json(menu);
    }catch(err){
      console.log(err)
      res.status(500).json({err:'Internal server error'})
    }
  }
)
//get menu param
router.get('/:taste',async function(req,res){
    try{
        const tasteType=req.params.taste;
        if(tasteType=='sweet'||tasteType=='spicy'||tasteType=='sour'){
            const response=await menuModel.find({taste:tasteType})
            console.log('response fetched')
            res.status(200).json(response)
        }else{
            res.status(404).json({error:'Invalid taste type'})
        }
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal server error'})
    }
})
module.exports=router