import React, { useState } from "react";
import "../assets/css/styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      // Make a request to your login API endpoint
      const response = await axios.post(
        "http://localhost:7860/api/users/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Assuming your backend returns the user role and name
        const userRole = response.data.role;
        // const profileName = response.data.Name;

        onLogin(userRole);

        // Store userRole in localStorage if needed
        localStorage.setItem("userRole", userRole);
        alert("Login Successful!");
        navigate("/dashboard");
      } else {
        // Handle authentication failure (e.g., incorrect credentials)
        setError("Invalid credentials");
      }
    } catch (error) {
      // Handle other errors (e.g., network issues)
      console.error("Error during login:", error);
      setError("Error during login. Please try again later.");
    }
  };
  return (
    <div className="container mt-5">
      <div id="liveAlertPlaceholder"></div>
      <div className="card border-primary margin-top">
        <div className="card-header bg-primary text-white">
          <h5 className="card-title">Login</h5>
        </div>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input
              id="floatingInput"
              type="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email or Username"
            />
            <label for="floatingInput">Email or Username</label>
          </div>

          <div className="form-floating mb-3">
            <input
              id="floatingInput1"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <label for="floatingInput1">Password:</label>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            id="liveAlertBtn"
            onClick={handleLogin}
          >
            Login
          </button>
          {error && <h3 className="text-danger text-size">{error}</h3>}
        </div>
      </div>
    </div>
  );
};

export default Login;
