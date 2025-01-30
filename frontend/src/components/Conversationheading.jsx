import React from "react";
import { useSelector } from "react-redux";
import "../styles/Conversationheading.css"

const Conversationheading = () => {
  const selectedusername = useSelector((state) => state.user.selectedusername);
  return (
    <div className="conversation-heading">
      <h2 className="heading-title">Conversation to {selectedusername}</h2>
    </div>
  );
};

export default Conversationheading;
