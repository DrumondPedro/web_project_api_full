class CustomHttpError extends Error {
  constructor({ message }) {
    super(message);
  }

  badRequest({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 400;
  }

  unauthorized({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 401;
  }

  notFound({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 404;
  }

  internalServerError({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 500;
  }
}

export default CustomHttpError;
