import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setselecteduserid,
  setselectedusername,
  setcurrentconversation,
} from "../features/userSlice";
import axiosInstance from "../lib/axiosInstance";
import socket from "../lib/socket";
import "../styles/listeduser.css"

const Listeduser = () => {
  const alluser = useSelector((state) => state.user.alluser);
  const filtereduser = useSelector((state) => state.user.filtereduser);
  const loggeduserid = useSelector((state) => state.user.loggeduserid);
  const coversation = useSelector((state) => state.user.currentconversation);
  const dispatch = useDispatch();
  const id = coversation._id;
  const handleselecteduser = async (user) => {
    try {
      dispatch(setselecteduserid(user._id));
      dispatch(setselectedusername(user.username));

      const res = await axiosInstance.post("/api/conversations", {
        loggeduserid,
        selecteduserid: user._id,
      });

      dispatch(setcurrentconversation(res.data));
      socket.emit("joinConversation", res.data._id);
    } catch (error) {
      console.error("Error creating or finding conversation:", error);
    }
  };

  return (
    <div className="listed-user-container">
      <h2>Userlist</h2>
      {filtereduser.length === 0
        ? alluser.map((user) => (
            <h4 key={user._id} onClick={() => handleselecteduser(user)} className="user-item">
              {user.username}
            </h4>
          ))
        : filtereduser.map((user) => (
            <h4 key={user._id} onClick={() => handleselecteduser(user)} className="user-item">
              {user.username}
            </h4>
          ))}
    </div>
  );
};

export default Listeduser;
