import React, { useState } from "react";
import "../styles/AddTasks.css";
import { useTodoContext } from "../context/ContextProvider";
import axios from "axios";
axios.defaults.withCredentials = true;

function AddTasks() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const { tasks, setTasks, isLoggedIn,apiUrl } = useTodoContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLoggedIn) {
        alert("please login to add task");
      }

      if (formData.title === "" && formData.description === "") {
        alert("please enter some value");
      } else {
        const response = await axios.post(
          `${apiUrl}/api/v1/todos/newTodo`,
          formData
        );
        setTasks([...tasks, response.data.data]);
        alert("task added");
      }
      setFormData({ title: "", description: "" });
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
    <div className="form-container">
      <h2>Add Task</h2>
      <div className="form-content">
        <form onSubmit={handleSubmit} action="/add-task" method="post">
          <div className="title">
            <span>Title</span>
            <input
              onChange={handleOnChange}
              value={formData.title}
              name="title"
              type="text"
            />
          </div>
          <div className="description">
            <span>content</span>
            <input
              onChange={handleOnChange}
              value={formData.description}
              name="description"
              type="text"
            />
          </div>
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTasks;
