import express from "express";
import createUser from "../controllers/userController";
import { jwtCheck } from "../middlewares/auth";

const userRoute = express.Router();

userRoute.post("/", jwtCheck, createUser);

export default {
  userRoute,
};
