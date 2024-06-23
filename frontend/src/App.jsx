import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddTasks from "./pages/AddTasks";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import SingleTodo from "./components/SingleTodo";
import TasksPages from "./pages/TasksPages";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <AddTasks />
            </div>
          }
        />
        <Route
          path="/Tasks"
          element={
            <div>
              <Navbar />
              <TasksPages />
            </div>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/getTodo/:id" element={<SingleTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
