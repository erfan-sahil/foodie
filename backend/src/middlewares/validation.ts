import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

export const validateUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("Country").isString().notEmpty().withMessage("Country must be a string"),
];
