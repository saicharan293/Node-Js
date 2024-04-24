const http=require('http')

const server=http.createServer(function(req,res){
    res.end("hello http server")
})
server.listen(3000)