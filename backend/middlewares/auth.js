import jwt from "jsonwebtoken";
import "dotenv/config";

import CustomHttpError from "../errors/CustomHttpError.js";

const { NODE_ENV, KEY_SECRET } = process.env;

export default (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith("Bearer ")) {
      const newError = new CustomHttpError({
        message: `Token inválido`,
      });
      newError.unauthorized({ method: `${req.method}`, path: "Auth" });
      throw newError;
    }
    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(
      token,
      NODE_ENV === "production" ? KEY_SECRET : "alternative-test-key"
    );
    req.user = payload;
  } catch (error) {
    const newError = new CustomHttpError({ message: error.message });
    newError.unauthorized({ method: `${req.method}`, path: "Auth" });
    const { message, typeError, statusCode } = newError;
    console.log(`Error: ${message} - ${typeError} - Status:${statusCode}`);
    return res.status(statusCode).send({ message: `Autorização necessária.` });
  }
  next();
};
