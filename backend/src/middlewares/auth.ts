import { auth } from "express-oauth2-jwt-bearer";
import { confidential } from "../secret/confidential";

export const jwtCheck = auth({
  audience: "foodies-api",
  issuerBaseURL: "https://dev-74lzlz5whp1bgerz.us.auth0.com/",
  tokenSigningAlg: "RS256",
});
