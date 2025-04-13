import jwt from "jsonwebtoken";

import CustomHttpError from "../errors/CustomHttpError.js";

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
    const payload = jwt.verify(token, "some-secret-key");
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
