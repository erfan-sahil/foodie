import { auth } from "express-oauth2-jwt-bearer";
import { confidential } from "../secret/confidential";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: "foodies-api",
  issuerBaseURL: "https://dev-74lzlz5whp1bgerz.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization || !authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: "Unauthorized, no token provided",
    });
  }
  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    console.log(decoded);
    const auth0Id = decoded.sub;

    const user = await UserModel.findOne({ auth0Id });

    if (!user) {
      return res.status(401).json({
        msg: "User not found",
      });
    }

    req.auth0Id = auth0Id as string;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.error("Error decoding token", error);
    return res.status(401).json({
      msg: "Unauthorized, invalid token",
    });
  }
};
