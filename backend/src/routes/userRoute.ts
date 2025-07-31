import express from "express";
import { createUser, updateCurrentUser } from "../controllers/userController";
import { jwtCheck } from "../middlewares/auth";

const userRoute = express.Router();

userRoute.post("/", jwtCheck, createUser);
userRoute.put("/", updateCurrentUser);

export default {
  userRoute,
};
