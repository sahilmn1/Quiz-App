// src/components/Auth.js
import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = { email, password };

    // Send login data to the server using axios
    axios
      .post("/api/users/login", userData)
      .then((response) => {
        console.log(response.data);
        // Handle successful login (e.g., set user token in localStorage)
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  const handleRegister = () => {
    const userData = { email, password };

    // Send registration data to the server using axios
    axios
      .post("/api/users/register", userData)
      .then((response) => {
        console.log(response.data);
        // Handle successful registration (e.g., redirect to login)
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  };

  return (
    <div>
      <h2>User Authentication</h2>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Auth;
