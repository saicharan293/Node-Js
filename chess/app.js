const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");

const app = express();

const server = http.createServer(app);

//socket is bridge between http and express(app)
const io=socket(server)

const chess=new Chess();
let players={};
let currentPlayer='W';

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.render('index',{title:"Custom Chess Game"})
})

io.on('connection',function(uniqueSocket){
    console.log('connected');
    
    uniqueSocket.on('charan',function(){
        // console.log('charan received');
        io.emit('charan is here');
    })
})

server.listen(3000,function(){
    console.log('listening on 3000')
})