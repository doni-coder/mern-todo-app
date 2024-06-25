import React,{useEffect} from "react";
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";
import Button from "./Button.jsx";
import { useTodoContext } from "../context/ContextProvider.jsx";
import axios from "axios";
axios.defaults.withCredentials = true;

function Navbar() {
  
  const { isLoggedIn, tasks, tasksCount, setTaskCount } = useTodoContext();

  useEffect(() => {
    const setTodoCount = async () => {
      if (isLoggedIn) {
        try {
          const response = await axios.post(`https://mern-todo-app-backend-ppfx.onrender.com/api/v1/users/todos`);
          const data = response.data.data.todos;
          setTaskCount(data.length);
        } catch (error) {
          console.log("Error: setTodoCount", error);
        }
      }
    };
    setTodoCount();
  }, [tasks, isLoggedIn, setTaskCount]);

  return (
    <div className="navbar">
      <div className="logo">
        <h2>Todo</h2>
      </div>
      <div className="actions">
        <NavLink to="/Tasks">
          <span className="span">
            Tasks <div className="msg-dot">{tasksCount}</div>
          </span>
        </NavLink>
        {isLoggedIn ? (
          <Button />
        ) : (
          <button className="btn">
            <NavLink to="/login">Login</NavLink>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
