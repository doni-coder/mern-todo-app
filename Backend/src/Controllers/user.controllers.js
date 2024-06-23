import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../Models/user.model.js";
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  console.log(username);
  if (!(username && email && password)) {
    throw new ApiError(400, "username email password required");
  }

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ApiError(400, "user already exist");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "user not created something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "user registered succesful"));
});

const generateRefreshAndAccessToken = async (userId) => {
  const user = await User.findById(userId);
  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { refreshToken, accessToken };
};

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  if (!(username || email) && !password) {
    throw new ApiError(400, "username & password required");
  }
  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "incorrect password");
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only secure in production
    sameSite: 'Lax',
    domain: 'mern-todo-app-frontend-i78y.onrender.com' // Ensure this matches your frontend domain
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, loggedinUser, "loggin succesful"));
});

const logoutUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "logout succesful"));
});

// a end point for getting todo

const getUserTodo = asyncHandler(async (req, res, next) => {
  const userId = req.user?._id;

  const todo = await User.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "todos",
        localField: "_id",
        foreignField: "createdBy",
        as: "todos",
      },
    },
  ]);

  if (!todo?.length) {
    throw new ApiError(404, "todo doesnot exist");
  }

  return res.status(200).json(new ApiResponse(200, todo[0], "data fetched"));
});

// a end point to know user is logged in or not

const isLoggedIn = asyncHandler(async (req,res)=>{
  const token = req.cookies["accessToken"];
  if (!token) {
    return res.status(401).json(new ApiResponse(200,{loggedIn:false},"not loggedin"))
  }

  try {
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    res.status(200).json(new ApiResponse(200,{loggedIn:true},"user logged in"))
  } catch (error) {
    return res.status(401).json(new ApiResponse(200,{loggedIn:false},"not loggedin"))
  }
})

export { registerUser, loginUser, logoutUser,getUserTodo,isLoggedIn };
