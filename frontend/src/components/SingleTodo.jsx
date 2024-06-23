import React, { useEffect, useState } from "react";
import "../styles/SingleTodo.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

function SingleTodo() {

  const navigate = useNavigate()

  let [formData, setFormData] = useState({
    title: "",
    description: "",
    isCompleted: false,
  });

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const { id } = useParams();
  const url = "/api/v1/todos/getTodo";

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.post(`${url}/${id}`);
        const data = response.data;
        setFormData({
          title: data.data.title,
          description: data.data.description,
          isCompleted: data.data.isCompleted,
        });
        console.log(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getResponse();
  }, [url, id]);

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const response = await axios.post(`/api/v1/todos/updateTodo/${id}`,formData)
    console.log(response.data);
    navigate("/Tasks")
  }


  const handleDelete = async ()=>{
    const response = await axios.post(`/api/v1/todos/deleteTodo/${id}`)
    console.log(response.data);
    alert("Task deleted")
    navigate('/Tasks')
  }

  return (
    <div className="single-todo-box">
      <div className="singleTodo-container">
        <h3>Update Todo</h3>
        <form onSubmit={handleSubmit} action="POST">
          <div className="title">
            <label htmlFor="title">Title:</label>
            <input onChange={handleOnChange} value={formData.title} name="title" type="text" />
          </div>
          <div className="description">
            <label htmlFor="description">Description:</label>
            <input onChange={handleOnChange} value={formData.description} name="description" type="text" />
          </div>
          <div className="checkbox">
            <label htmlFor="isCompleted">Completed:</label>
            <input onChange={handleOnChange} checked={formData.isCompleted} name="isCompleted" type="checkbox" />
          </div>
          <button type="submit" className="save-btn">Save</button>
        </form>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
        <Link to="/Tasks">
          <div className="cancel">
            <span>X</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SingleTodo;
