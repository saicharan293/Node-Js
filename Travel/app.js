const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const placeModel=require('./models/place')

const MONGO_URL='mongodb://127.0.0.1:27017/travel';
main().then(()=>{
    console.log('Connect to db')
})
.catch(err=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set('views engine','ejs')
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    res.send('hii, mai root hu');
})

app.get('/demo',async(req,res)=>{
    let samplePlace=new placeModel({
        title:"my first hotel",
        description:"it is very good place",
        price:3000,
        location:"Bangalore",
        country:"India"
    })
    await samplePlace.save();
    console.log("sample is saved");
    res.send("successfully testing")
})

app.get('/place',async(req,res)=>{
    // res.send("place root");
    const allPlaces=await placeModel.find({});
    res.render('/Places/index.ejs',{allPlaces})
})

app.listen(8080,()=>{
    console.log("hmara server 8080 chl gya hai")
})