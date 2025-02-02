import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../lib/axiosInstance";
import socket from "../lib/socket";
import { pushingmessage } from "../features/userSlice";
import "../styles/sendmessage.css";

const SendMessage = () => {
  const loggeduserid = useSelector((state) => state.user.loggeduserid);
  const selecteduserid = useSelector((state) => state.user.selecteduserid);
  const coversation = useSelector((state) => state.user.currentconversation);
  const id = coversation._id;
  const dispatch = useDispatch();
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      dispatch(pushingmessage(data));
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch]); // Add `dispatch` to the dependency array

  const sendmessage = async (e) => {
    e.preventDefault();
    if(input.trim() === ""){
      return alert("Empty can't be sent")
    } 
    try {
      // Emit the message to the server
      socket.emit("sendMessage", { id, input, loggeduserid });
      const res = await axiosInstance.post("/api/messages", {
        selecteduserid,
        loggeduserid,
        input,
      });
      setInput('');
      console.log("Input after clearing:", input);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="input-field-container" onSubmit={sendmessage}>
      <input
        type="text"
        value={input || ""}
        className="message-input"
        placeholder="Type any to send"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="send-button" type="submit">Send</button>
    </form>
  );
};

export default SendMessage;