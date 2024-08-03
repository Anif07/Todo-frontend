import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Pleaselogin = () => {
  return (
    <div className="pleaselogin">
      <h1>Please Login</h1>
      <Link to="/login" className=" login-btn">
        Login
      </Link>
    </div>
  );
};

export default Pleaselogin;
