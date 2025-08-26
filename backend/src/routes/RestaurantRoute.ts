import express from "express";
import { param } from "express-validator";

const restaurantRouter = express.Router();

restaurantRouter.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a string"),
  restaurantController
);

export default { restaurantRouter };
