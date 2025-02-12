import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleloggin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("api/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };
  return (
    <div class="login-container ">
      <div class="login-box">
        <h2>Welcome Back!</h2>
        <p>Please login to your account</p>
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
        {error && (
          <div
            style={{
              color: "red",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid red",
              borderRadius: "4px",
            }}
          >
            {error}
          </div>
        )}
        <div class="signup-link">
          <p>
            Don't have an account? <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
