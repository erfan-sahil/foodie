import express from "express";
import {
  createUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateUserRequest } from "../middlewares/validation";

const userRouter = express.Router();

userRouter.get("/", jwtCheck, jwtParse, getCurrentUser);
userRouter.post("/", jwtCheck, createUser);
userRouter.put("/", jwtCheck, jwtParse, validateUserRequest, updateCurrentUser);

export default {
  userRouter,
};
