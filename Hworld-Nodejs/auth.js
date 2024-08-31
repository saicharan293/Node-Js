const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const personModel=require('./models/Person')


passport.use(new localStrategy(async(username,password,done)=>{
    try {
        console.log('Received Credentials:',username,password);
        const user=await personModel.findOne({username:username});
        if(!user) return done(null, false,{message:'Incorrect username.'})
        const isPassword=(user.password==password)?true:false;
        if(isPassword) return done(null,user);
        else return done(null,false,{message:'Incorect password'})
    } catch (error) {
        console.log(error)
    }
}))



module.exports=passport;