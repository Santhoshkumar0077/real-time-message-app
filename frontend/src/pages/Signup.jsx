import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

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
    } catch (error) {}
  };
  return (
    <div className="container">
      <h1>Signup</h1>
      <h3>Username</h3>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <h3>Password</h3>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleloggin}>Submit</button>
      <p>{message}</p>

      <Link to={"/login"}>already have an account</Link>
    </div>
  );
};

export default Signup;
