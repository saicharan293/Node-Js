const socket = io();
// frontend -> "sai" -> backend
socket.emit('sai');

// backend -> "sai liya" -> frontend
socket.on('sai liya',function(){
    console.log('sai liya kha ra ha hai')
})