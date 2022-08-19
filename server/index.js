const http = require('http');
const cors = require('cors');
const Room = require('./api/model/room');
const express = require('express');
const mongoose = require('mongoose');
const { Server } = require('socket.io')

const app = express()

//connecting db
mongoose.connect(`mongodb+srv://chatapp:${process.env.MONGO_PASS}@chatapp.yuylmkz.mongodb.net/?retryWrites=true&w=majority`);

//server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);

//we can handle cors here or could pass an object
app.use(cors());

//socket setup
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET, POST']
    }
})

io.on("connection", (socket) => {
    console.log(`user connected with id ${socket.id}`);

    //output for searching rooms
    socket.on("search_room", (data) => {
        console.log(data);
        Room.find({ name: data}).exec()
        .then(result => {
            console.log(result)
            if (result.length > 0) {
                socket.emit("room_data", {
                    room: result
                });
            } else {
                socket.emit("room_data", {
                    room: null
                });
            }
        })
        .catch(err =>{
            console.log(err);
        })
    })

    //output for creating rooms
    socket.on("create_room", (data) => {
        console.log(data);
        const room = new Room({
            _id : new mongoose.Types.ObjectId(),
            name : data.roomName,
            description: data.roomDescription,
        });
        room.save()
        .then(result => {
            socket.join(result._id);
            socket.emit("room_created", {
                message : true
            })
            console.log((result._id));
        }).catch(err => {
            console.log(err);
            socket.emit("room_created", {
                message : false
            })
        }
        )
    });
    
    //output for joining rooms
    socket.on("join_room_id", (data) => {
        console.log(data);
        Room.findById(data).exec()
        .then(result => {
            console.log(result);
            if (result) {
                socket.join(result._id);
                socket.emit("room_info", {
                    message: "joined room",
                });
            }else{
                socket.emit("room_info", {
                    message: "room not found",
                });
            }
        }).catch(err => {
            console.log(err);
        })
    });

    //brodcasting messages
    socket.on("send_message", (data) => {
        console.log(data);
        //emitting recieved message to all clients in the room
        socket.to(data.roomId).emit("receive_message", data)
    })

    socket.on("disconnect", (data) => {
        console.log(`user ${socket.id} disconnected`);
        // console.log(socket.rooms.get(data.roomId).size);
    });
});

//server with a callback
server.listen(port, () => {
    console.log('server running');
})