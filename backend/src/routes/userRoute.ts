import express from "express";
import { createUser, updateCurrentUser } from "../controllers/userController";
import { jwtCheck, jwtParse } from "../middlewares/auth";

const userRoute = express.Router();

userRoute.post("/", jwtCheck, createUser);
userRoute.put("/", jwtCheck, jwtParse, updateCurrentUser);

export default {
  userRoute,
};
