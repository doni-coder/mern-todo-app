import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { Todo } from "../Models/todo.model.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "title & description required");
  }
  const createdBy = req.user?._id;

  const todo = await Todo.create({
    title: title,
    description: description,
    createdBy: createdBy,
  });

  if (!todo) {
    throw new ApiError(500, "todo not created");
  }

  return res.status(200).json(new ApiResponse(200, todo, "todo created"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { isCompleted, title, description } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      $set: {
        title: title,
        description: description,
        isCompleted: isCompleted,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  console.log(todo);

  return res.status(200).json(new ApiResponse(200, todo, "todo updated"));
});
const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  res.status(200).json(new ApiResponse(200, {}, "todo deleted"));
});
const getTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    throw new ApiError(400, "todo not found");
  }

  res.status(200).json(new ApiResponse(200, todo, "todo fetched"));
});

export { createTodo, updateTodo, deleteTodo, getTodo };
