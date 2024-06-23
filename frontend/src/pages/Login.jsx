import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { useTodoContext } from "../context/ContextProvider";
axios.defaults.withCredentials = true;

function Login() {
  const { setIsLoggedIn,setIsLoading } = useTodoContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/users/login", formData,{withCredentials: true});
      console.log("Response data:", response.data);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log("Login error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form onSubmit={handleSubmit} action="POST">
          <div className="email">
            <label htmlFor="email">Email :</label>
            <input
              onChange={handleOnChange}
              value={formData.email}
              name="email"
              type="email"
            />
          </div>
          <div className="password">
            <label htmlFor="password">password :</label>
            <input
              onChange={handleOnChange}
              value={formData.password}
              name="password"
              type="password"
            />
          </div>
          <button type="submit">login</button>
        </form>
        <p>
          If don't have account then {" "}
          <span>
            <Link to="/signup"> create account</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
