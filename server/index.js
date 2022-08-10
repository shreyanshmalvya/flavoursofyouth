const http = require('http');
const express = require('express');
const cors = require('cors')
const {Server} = require('socket.io')

const app = express()

//server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

//we can handle cors here or could pass an object
app.use(cors());

//socket setup
const io = new Server(server, {
    cors: {
        origin : '*',
        methods : ['GET, POST']
    }
})

io.on("connection", (socket)=>{
    console.log(`user connected with id ${socket.id}`);
    
    socket.on("join_room", (data)=>{
        //we use built in fuction to join the event, we send room id in the request data
        socket.join(data);
    });
    
    socket.on("send_message", (data)=>{
        console.log(data);
        //use .to to send message to a targeted room
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect", ()=> {
        console.log(`user ${socket.id} disconnected`)
    });
});

//server with a callback
server.listen(port, ()=> {
    console.log('server running');
})