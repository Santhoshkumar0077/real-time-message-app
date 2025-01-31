import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import router from "./routes/authrouter.js";
import cors from "cors";
import path from  "path"

dotenv.config();
const _dirname = path.resolve()
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://real-time-message-app-kbej.onrender.com",
    transports: ['websocket'],
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use("/api", router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinConversation", (id) => {
    socket.join(id);
    console.log(`User ${socket.id} joined conversation ${id}`);
  });
  socket.on("sendMessage", async ({ id, input, loggeduserid }) => {
    try {
      const message = { input, loggeduserid, createdAt:  new Date };
      io.to(id).emit("receiveMessage", message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
if(process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(_dirname,"../frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"../frontend","dist","index.html"));
  })
}
server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
