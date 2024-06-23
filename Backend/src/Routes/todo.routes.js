import { Router } from "express";
import { verifyJwt } from "../middlewares/Auth.middleware.js";
import { createTodo,updateTodo,deleteTodo,getTodo } from "../Controllers/todo.controller.js";

const router = Router()

router.route("/newTodo").post(verifyJwt,createTodo)
router.route("/updateTodo/:id").post(verifyJwt,updateTodo)
router.route("/deleteTodo/:id").post(verifyJwt,deleteTodo)
router.route("/getTodo/:id").post(verifyJwt,getTodo)


export default router