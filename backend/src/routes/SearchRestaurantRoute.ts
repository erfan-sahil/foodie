import express from "express";
import { param } from "express-validator";
import { searchRestaurants } from "../controllers/SearchRestaurantController";

const searchRestaurantRouter = express.Router();

searchRestaurantRouter.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  searchRestaurants
);

export default { searchRestaurantRouter };
