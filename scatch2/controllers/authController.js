const userModel=require('../models/userModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const{generateToken}=require('../utils/generateToken')


module.exports.registerUser=async(req,res)=>{
    try{
        let{email,password,fullname}= req.body;
        let user=await userModel.findOne({email:email});
        if(user) return res.status(401).send('you already have an account, please login! ')
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user=await userModel.create({
                    email,
                    password:hash,
                    fullname
                    })
                    // let token=jwt.sign({email,id:user._id},'hiihii');
                    let token=generateToken(user);
                    res.cookie("token",token);
                    res.send("user created successfully");
                }
            })
        })
        
    }catch(err){
        res.send(err.message)
    }
}

module.exports.loginUser=async(req,res)=>{
    let {email, password}=req.body;
    let user=await userModel.findOne({email:email});
    if(!user) return res.send('Email or password incorrect ')
    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie("token",token)
            res.send("Login successfull ! ")
        }
        else{
            return res.send('Email or password incorrect ')
        }
    })
}

