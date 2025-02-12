import React, { useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };
  return (
    <div
      class="login-container "
      style={{ background: "linear-gradient(135deg,rgb(161, 98, 228),rgb(64, 92, 139))" }}
    >
      <div class="login-box">
        <h2>Please signup to your account</h2>
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
            Already have an account? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
