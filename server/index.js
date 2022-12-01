require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/UserRoute");
const User = require("./models/UserModel");
const Message = require("./models/MessageModel");

const rooms = ["general", "tech", "finance", "crypto"];

const app = express();
app.use(cors());

//middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// socket server
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000 || process.env.PORT;

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connect to mongodb");
});

async function getLastMessageFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $sort: { createdAt: 1 } },
    { $group: { _id: "$createdAt", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
}

io.on("connection", (socket) => {
  socket.on("new-user", async () => {
    const users = await User.find();
    socket.emit("new-user", users);
  });

  socket.on("room", async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    const roomMessages = await getLastMessageFromRoom(newRoom);
    // roomMessages = sortMessages(roomMessages);
    //sending message to room
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async (room, content, sender) => {
    const newMessage = new Message({
      content,
      to: room,
      from: sender,
    });
    await newMessage.save();
    let roomMessages = await getLastMessageFromRoom(room);
    // console.log(roomMessages);
    //sending message to a room
    io.to(room).emit("room-messages", roomMessages);
    socket.broadcast.emit("notifications", room);
  });

  // logout
  app.delete("/logout", async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline"; 
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit("new-user", members);
      res.status(200).send();
    } catch (err) {
      console.log(err);
      res.status(400).send();
    }
  });
});

app.use("/user", userRoute);
app.get("/rooms", (req, res) => {
  res.json(rooms);
});

server.listen(PORT, () => {
  console.log("server is running");
});
