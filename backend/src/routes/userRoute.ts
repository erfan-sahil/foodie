import express from "express";
import createUser from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/", createUser);

export default {
  userRoute,
};
