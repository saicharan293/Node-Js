const express=require('express');
const router=express.Router();

// const db=require('./db');
const personModel=require('./../models/Person');


//post route to add a person
router.post('/',async function(req,res){
    try{
      const data=req.body;
      const newPeron=new personModel(data);
      const response=await newPeron.save()
      console.log('data saved');
      res.status(200).json(response);
    }catch(err){
      console.log('some error',err);
      res.status(500).json({err:'Internal server error'})
    }
})

//get person detail

router.get('/',async (req,res)=>{
    try{
      const data=await personModel.find();
      console.log('data fetched')
      res.status(200).json(data)
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal server error'})
    }
})

//params
router.get('/:worktype',async (req,res)=>{
    try{
      const workType=req.params.worktype
      if(workType=='chef'|| workType=='manager'||workType=='waiter'){
        const response=await personModel.find({work:workType});
        console.log('response fetched');
        res.status(200).json(response)
      }else{
        res.status(404).json({error:'Invalid work type'})
      }
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal server error'});
    }
})

module.exports=router;