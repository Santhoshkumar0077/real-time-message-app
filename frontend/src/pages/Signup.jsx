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
    } catch (error) {
      setMessage(error.message);
    }
  };
  return (
    <div class="login-container ">
      <div class="login-box">
        <h2>Welcome Back!</h2>
        <p>Please signup to your account</p>
        <form class="login-form">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" class="login-button" onClick={handleloggin}>
            Submit
          </button>
        </form>
        <div class="signup-link">
          <p>
            Already have an account? <Link to={"/login"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
