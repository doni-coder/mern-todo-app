import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/ApiError.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const verifyJwt = asyncHandler(async (req,_, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new ApiError(400, "unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(400, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.mesage || "invalid access token");
  }
});

