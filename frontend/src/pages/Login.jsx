import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleloggin = async () => {
    try {
      const res = await axiosInstance.post("api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (error) {
      setError(res.data.message);
    }
  };
  return (
    <div>
      <div className="container">
        <h1 className="items">login</h1>
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
        <div className="items">{error}</div>
        <Link to={"/signup"}>Don't have an account</Link>
      </div>
    </div>
  );
};

export default Login;
