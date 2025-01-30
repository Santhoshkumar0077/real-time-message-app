import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSocket } from "../features/socketSlice";
import "../styles/messagelist.css";

const MessageList = () => {
  const messages = useSelector(
    (state) => state.user.currentconversation.messages
  );
  const coversation = useSelector((state) => state.user.currentconversation);
  const id = useSelector((state) => state.user.loggeduserid);
  const lastmessage = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      scrolltobottom();
    }, 100);
  }, [coversation]);
  const scrolltobottom = () => {
    if (lastmessage.current) {
      lastmessage.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }); // 24-hour format
  };
  return (
    <div className="message-list">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <>
            <div ref={lastmessage} key={index} className="message-container">
              <span
                className={`message-item ${
                  message.loggeduserid === id ? `sent` : `received`
                }`}
              >
                {message.input}
              </span>
              <span
                className={`message-time ${
                  message.loggeduserid === id ? `sent-time` : `received-time`
                }`}
              >
                {formatTime(message.createdAt)}
              </span>
            </div>
          </>
        ))
      ) : (
        <div>No messages yet</div> // Show a fallback message when there are no messages
      )}
    </div>
  );
};

export default MessageList;
