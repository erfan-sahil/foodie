import { Request, Response } from "express";
import UserModel from "../models/userModel";

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserModel.create({});
    res.status(200).json({
      msg: "User route is working",
      newUser: newUser,
    });
  } catch (error) {
    console.error("Error in userRoute", error);
    res.status(500).json({
      msg: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export default createUser;
