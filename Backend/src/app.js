import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["https://mern-todo-app-frontend-i78y.onrender.com","http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

import userRouter from "./Routes/user.routes.js";
import todoRouter from "./Routes/todo.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);

export { app };
