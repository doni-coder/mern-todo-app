import React, { useEffect } from "react";
import Tasks from "../components/Tasks";
import { Link } from "react-router-dom";
import "../styles/TasksPages.css";
import { useTodoContext } from "../context/ContextProvider";
import axios from "axios";
import Spinner from "../components/Spinner";
axios.defaults.withCredentials = true;

function TasksPages() {
  const { tasks, setTasks, isLoading, setIsLoading, isLoggedIn  } =
    useTodoContext();
  useEffect(() => {
    const getResponse = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          `/api/v1/users/todos`
        );
        const data = response.data;
        console.log(data);
        setTasks(data.data.todos || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      }
    };

    getResponse();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : isLoggedIn ? (
    <div className="tasks-container-1">
      <div className="link">
        <Link style={{ color: "white" }} to="/">
          &#8592;
        </Link>
      </div>
      <div className="tasks">
        {tasks.map((item) => (
          <Tasks
            key={item._id}
            _id={item._id}
            title={item.title}
            description={item.description}
            isCompleted={item.isCompleted}
          />
        ))}
      </div>
    </div>
  ) : (
    <div style={{marginTop:"50px",textAlign:"center"}}>
        <h3 style={{color:"white",fontFamily:"Poppins"}}>Login to view tasks</h3>
    </div>
  );
}

export default TasksPages;
