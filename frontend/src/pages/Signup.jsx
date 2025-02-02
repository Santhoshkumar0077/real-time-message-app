import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleloggin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("api/signup", {
        username,
        password,
      });
      setMessage(res.data.message);
      setInterval(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage(res.data.message)
    }
  };
  return (
    <div>
      <div className="container">
        <h1 className="items">Signup</h1>
        <div className="items">Username</div>
        <input
          className="items"
          type="text"
          name=""
          id=""
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="items"> Password</div>
        <input
          className="items"
          type="text"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="items" onClick={handleloggin}>
          Submit
        </button>
        <div className="items">{message}</div>
        <Link to={"/login"}>Already have an account</Link>
      </div>
    </div>
  );
};

export default Signup;
