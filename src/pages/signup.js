import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todo-backend-mrhc.onrender.com/register",
        {
          email,
          password,
        }
      );
      alert("successfully registered please check your email for confirmation");
      console.log("User registered:", response.data);
      navigate("/login");
    } catch (error) {
      alert(error.response.data);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="signup-cont">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-heading">
          <h1>Sign up</h1>
          <p>Create Your Account</p>
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="signup-fields"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="signup-fields"
        />
        <button type="submit" className="signup-btn">
          Signup
        </button>
        <p>
          Already have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
