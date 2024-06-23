import React, { useState } from "react";
import "../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTodoContext } from "../context/ContextProvider";
axios.defaults.withCredentials = true;

function SignUp() {
  const {apiUrl} = useTodoContext()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: " ",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/v1/users/register`,
        formData
      );
      alert("user registered successful");
      navigate("/login")
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="signup-body">
      <div className="signup-container">
        <h2>create account</h2>
        <form onSubmit={handleSubmit} action="POST">
          <div className="username">
            <label htmlFor="username">username : </label>
            <input
              onChange={handleOnChange}
              value={formData.username}
              name="username"
              type="text"
            />
          </div>
          <div className="email">
            <label htmlFor="email">email : </label>
            <input
              onChange={handleOnChange}
              value={formData.email}
              name="email"
              type="email"
            />
          </div>
          <div className="password">
            <label htmlFor="password">password : </label>
            <input
              onChange={handleOnChange}
              value={formData.password}
              name="password"
              type="password"
            />
          </div>
          <button type="submit" className="btn">
            create account
          </button>
        </form>
        <p className="signup-p">
          If already account then
          <span>
            <Link to="/login"> login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
