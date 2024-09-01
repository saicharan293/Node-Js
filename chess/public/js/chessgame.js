//connecting socket on js in frontend
const socket=io();

socket.emit('charan')
socket.on('charan is here',function(){
    console.log('charan socket received');  
})