import express from "express";
import { createUser, updateCurrentUser } from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateUserRequest } from "../middlewares/validation";

const userRoute = express.Router();

userRoute.post("/", jwtCheck, createUser);
userRoute.put("/", jwtCheck, jwtParse, validateUserRequest, updateCurrentUser);

export default {
  userRoute,
};
