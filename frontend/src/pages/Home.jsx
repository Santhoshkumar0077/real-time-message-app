import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import Listeduser from "../components/Listeduser";
import Logout from "../components/Logout";
import Conversationheading from "../components/Conversationheading";
import MessageList from "../components/MessageList";
import SendMessage from "../components/SendMessage";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../lib/axiosInstance";
import {
  setallusers,
  setloggeduserid,
  setloggedusername,
} from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Conversationheadingmobile from "../components/Conversationheadingmobile";

const Home = () => {
  const [isvalid, setIsvalid] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedid = useSelector((state) => state.user.selecteduserid);
  const mobileView = window.innerWidth < 600;

  useEffect(() => {
    const fetchalluser = async () => {
      try {
        const res = await axiosInstance.get("api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setIsvalid(true);
        dispatch(setallusers(res.data.users));
        dispatch(setloggeduserid(res.data.loggeduserid));
        dispatch(setloggedusername(res.data.loggedusername));
      } catch (error) {
        if (error.response && error.response.status === 500) {
          navigate("/login");
        }
      }
    };
    fetchalluser();
  }, []);

  if (!isvalid) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {mobileView ? (
        selectedid ? ( // Check if a user is selected in Redux
          <div className="conversation">
            <Conversationheadingmobile />
            <MessageList />
            <SendMessage />
          </div>
        ) : (
          <div className="sidebar">
            <Searchbar />
            <Listeduser />
            <Logout />
          </div>
        )
      ) : (
        <div className="home-container">
          <div className="sidebar">
            <Searchbar />
            <Listeduser />
            <Logout />
          </div>
          <div className="conversation">
            <Conversationheading />
            <MessageList />
            <SendMessage />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
