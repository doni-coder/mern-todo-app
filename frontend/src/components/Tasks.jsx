import React from "react";
import "../styles/Tasks.css";
import { Link } from "react-router-dom";

function Tasks({_id, title, description, isCompleted = true }) {
  return (
    <Link to={`/getTodo/${_id}`}>
      <div className="task-container">
        <div className="title-block">
          <h4>{title}</h4>
        </div>
        <hr />
        <div className="description-block">
          <p>{description}</p>
        </div>
        <span
          className={`badges ${isCompleted ? "completed" : "notCompleted"}`}
        >
          {isCompleted ? "completed" : "pending"}
        </span>
      </div>
    </Link>
  );
}

export default Tasks;
