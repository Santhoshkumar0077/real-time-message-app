import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleloggin = async () => {
    try {
      const res = await axiosInstance.post("api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/")
    } catch (error) {}
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <h3>Username</h3>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <h3>Password</h3>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleloggin}>Submit</button>

      <Link to={"/signup"}>Don't have an account</Link>
    </div>
  );
};

export default Login;
