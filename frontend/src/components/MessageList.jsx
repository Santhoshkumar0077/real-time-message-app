import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/messagelist.css";

const MessageList = () => {
  const [loading, setLoading] = useState(true); // Default loading state is true
  const messages = useSelector(
    (state) => state.user.currentconversation.messages
  );
  const coversation = useSelector((state) => state.user.currentconversation);
  const id = useSelector((state) => state.user.loggeduserid);
  const lastmessage = useRef(null);

  useEffect(() => {
    // Simulate loading or fetching messages
    setLoading(true); // Set loading to true while waiting
    setTimeout(() => {
      setLoading(false); // Set loading to false once data is loaded
      scrolltobottom();
    }, 100); // Simulating fetch delay (adjust as necessary)
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
      {loading ? (
        <div className="loading-message">Loading messages...</div> // Show loading state
      ) : messages && messages.length > 0 ? (
        messages.map((message, index) => (
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
        ))
      ) : (
        <div>No messages yet</div> // Show a fallback message when there are no messages
      )}
    </div>
  );
};

export default MessageList;
