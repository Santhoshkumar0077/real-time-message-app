import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/messagelist.css";

const MessageList = () => {
  const [loading, setLoading] = useState(false);
  const messages = useSelector(
    (state) => state.user.currentconversation.messages
  );
  const conversation = useSelector((state) => state.user.currentconversation);
  const id = useSelector((state) => state.user.loggeduserid);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [conversation]);

  // Function to scroll to the last message
  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Function to format time for messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="message-list">
      {loading ? (
        <div className="loading-message">Loading messages...</div>
      ) : messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <div
            key={index}
            className="message-container"
            ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to the last message
          >
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
        ))
      ) : (
        <div>No messages yet</div>
      )}
    </div>
  );
};

export default MessageList;
