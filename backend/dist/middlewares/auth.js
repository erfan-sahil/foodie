"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtParse = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: "foodies-api",
    issuerBaseURL: "https://dev-74lzlz5whp1bgerz.us.auth0.com/",
    tokenSigningAlg: "RS256",
});
const jwtParse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization || !(authorization === null || authorization === void 0 ? void 0 : authorization.startsWith("Bearer "))) {
        return res.status(401).json({
            msg: "Unauthorized, no token provided",
        });
    }
    const token = authorization.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.decode(token);
        const auth0Id = decoded.sub;
        const user = yield userModel_1.default.findOne({ auth0Id });
        if (!user) {
            return res.status(401).json({
                msg: "User not found",
            });
        }
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    }
    catch (error) {
        console.error("Error decoding token", error);
        return res.status(401).json({
            msg: "Unauthorized, invalid token",
        });
    }
});
exports.jwtParse = jwtParse;
