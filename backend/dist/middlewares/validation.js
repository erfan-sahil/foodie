"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurantRequest = exports.validateUserRequest = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array(),
            msg: "Validation failed",
        });
    }
    next();
};
exports.validateUserRequest = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be a string"),
    (0, express_validator_1.body)("addressLine1")
        .isString()
        .notEmpty()
        .withMessage("AddressLine1 must be a string"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be a string"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors,
];
exports.validateRestaurantRequest = [
    (0, express_validator_1.body)("restaurantName")
        .isString()
        .notEmpty()
        .withMessage("Restaurant name must be a string"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be a string"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be a string"),
    (0, express_validator_1.body)("deliveryPrice")
        .isFloat({ min: 0 })
        .notEmpty()
        .withMessage("Delivery price must be a number"),
    (0, express_validator_1.body)("deliveryPrice")
        .isInt({ min: 0 })
        .notEmpty()
        .withMessage("Estimated delivery time must be a number"),
    (0, express_validator_1.body)("cuisines")
        .isArray()
        .withMessage("Cuisines must be an array")
        .not()
        .isEmpty()
        .withMessage("Cuisines cannot be empty"),
    (0, express_validator_1.body)("menuItems").isArray().withMessage("Menu items must be an array"),
    (0, express_validator_1.body)("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu item name cannot be empty"),
    (0, express_validator_1.body)("menuItems.*.price")
        .notEmpty()
        .withMessage("Menu item price cannot be empty"),
    handleValidationErrors,
];
