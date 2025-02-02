import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/conversationheading.css";
import { resetback } from "../features/userSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

const Conversationheading = () => {
  const selectedusername = useSelector((state) => state.user.selectedusername);
  const id = useSelector((state) => state.user.selecteduserid);
  const dispatch = useDispatch();
  const handleback = () => {
    dispatch(resetback());
  };
  return (
    <>
      <IoMdArrowRoundBack onClick={handleback} className="back-button" />
      <div className="conversation-heading">
        <h2 className="heading-title">Conversation to {selectedusername}</h2>
      </div>
    </>
  );
};

export default Conversationheading;
