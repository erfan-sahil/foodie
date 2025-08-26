import express from "express";
import { param } from "express-validator";
import { searchRestaurants } from "../controllers/RestaurantController";

const restaurantRouter = express.Router();

restaurantRouter.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  searchRestaurants
);

export default { restaurantRouter };
