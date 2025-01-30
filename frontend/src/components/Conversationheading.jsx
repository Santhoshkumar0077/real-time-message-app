import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "../styles/Conversationheading.css";
import { resetback } from "../features/userSlice";

const Conversationheading = () => {
  const selectedusername = useSelector((state) => state.user.selectedusername);
  const id = useSelector((state)=>state.user.selecteduserid)
  const dispatch = useDispatch()
  const handleback = () => {
    dispatch(resetback())
  }
  return (

    <>
      <button onClick={handleback} style={{display:"block", width:"50px", height:"15px"}}>back</button>
      <div className="conversation-heading">
        <h2 className="heading-title">Conversation to {selectedusername}</h2>
      </div>
    </>
  );
};

export default Conversationheading;
