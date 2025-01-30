import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/logout.css"
import { resetstate } from "../features/userSlice";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handlelogout = () => {
    localStorage.removeItem("token");
    dispatch(resetstate())
    navigate("/login");
  };
  return (
    <div className="logout-container">
      {/* <SlLogout onClick={handlelogout} className="logout-button" /> */}
      <button onClick={handlelogout} className="logout-button" >Logout</button>
    </div>
  );
};

export default Logout;
