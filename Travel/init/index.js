const mongoose=require('mongoose');

const initData=require('./data')

const placeModel=require('../models/place')

const MONGO_URL='mongodb://127.0.0.1:27017/travel';
main().then(()=>{
    console.log('Connect to db')
})
.catch(err=>console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await placeModel.deleteMany({}),
    await placeModel.insertMany(initData.data);
    console.log("data is initialized")
}

initDB();