import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Conversationheading.css";
import { resetback } from "../features/userSlice";
import { IoArrowBackSharp } from "react-icons/io5";



const Conversationheadingmobile = () => {
  const selectedusername = useSelector((state) => state.user.selectedusername);
  const dispatch = useDispatch()
  const onBackclick = (e) =>{
    e.preventDefault();
    dispatch(resetback())
  }
  return (
    <>
      <IoArrowBackSharp  onClick={onBackclick}/>
      <div className="conversation-heading">
        <h2 className="heading-title">Conversation to {selectedusername}</h2>
      </div>
    </>
  );
};

export default Conversationheadingmobile;
