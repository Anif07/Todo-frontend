import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notvalid, setNotvalid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
      setToken(response.data.token);
      console.log(response.data.token);
      alert("successfully login");
      navigate("/");
    } catch (error) {
      setNotvalid(true);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="signup-cont">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="signup-heading">
          <h1>Login</h1>
          {/* <p>Create Your Account</p> */}
        </div>
        {notvalid && (
          <div>
            <p className="invalid">Invalid login credentials</p>
          </div>
        )}
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
          Login
        </button>
        <p>
          Don't have an Account? <Link to="/register">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
