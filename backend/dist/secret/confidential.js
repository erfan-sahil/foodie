"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confidential = void 0;
require("dotenv/config");
const confidential = () => {
    const port = process.env.PORT || 5500;
    const auth0Audience = process.env.AUTH0_AUDIENCE;
    const auth0IssuerBaseURL = process.env.AUTH0_ISSUER_BASE_URL;
    const mongodbConnectionString = process.env.MONGODB_CONNECTION_STRING;
    return {
        port,
        mongodbConnectionString,
        auth0Audience,
        auth0IssuerBaseURL,
    };
};
exports.confidential = confidential;
