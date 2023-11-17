import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/styles.css";
import "../assets/css/Home.css";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Simulate loading for 2 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    // Clear the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array means this effect runs once on mount

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to your registration API endpoint
      const response = await axios.post(
        "http://localhost:7860/api/users/register",
        {
          username: credentials.username,
          password: credentials.password,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Registration successful! You can now log in.");
        alert("You can Login Now!");
        setError(null);
        // Redirect to the login page after successful registration
      } else {
        setSuccessMessage(null);
        setError(
          response.data.message ||
            "Registration failed. Please check your information."
        );
      }
    } catch (error) {
      setSuccessMessage(null);
      setError("Error during registration. Please try again ");
      alert("Error during RegistrationForm");
    }
  };

  return (
    <div className="container margin-top">
      {loading ? (
        // Display loading card during the 2-second loading period
        <div className="card p-4">
          <h3>Loading...</h3>
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
          {/* You can add a loading spinner or any other loading UI here */}
        </div>
      ) : (
        // Display registration form once loading is complete
        <div className="card border-primary margin-top">
          <div className="card-header bg-primary text-white">
            <h5 className="card-title">Registration</h5>
          </div>
          <div className="card-body">
            {error && <h3 className="text-danger text-size">{error}</h3>}
            {successMessage && (
              <p className="text-success text">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  id="floatingInput"
                  type="username"
                  className="form-control"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  placeholder="Username or Email"
                />
                <label for="floatingInput">Username or Email:</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  id="floatingInput1"
                  type="password"
                  className="form-control"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <label for="floatingInput1">Password:</label>
              </div>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <br />
              <br />
              <Link to="/login" className="mt-3">
                Have an account? Click here to login.
              </Link>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
