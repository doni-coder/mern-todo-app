import { Router } from "express";
import { loginUser, logoutUser, registerUser,getUserTodo,isLoggedIn } from "../Controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/Auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/status").post(isLoggedIn)

//secured route
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/todos").post(verifyJwt,getUserTodo)

export default router;