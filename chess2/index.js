const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const exp = require("constants");
const path = require("path");

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer='w';

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index',{title:'Custom Chess game'});
})

io.on('connection',function(uniqueSocket){
    console.log('connected')

    // receive "sai" from frontend
    uniqueSocket.on('sai',function(){
        // console.log('sai received');
        //send "sai" to frontend
        io.emit('sai liya');
    })
})



server.listen(3000,function(){
    console.log('listening on 3000')
})