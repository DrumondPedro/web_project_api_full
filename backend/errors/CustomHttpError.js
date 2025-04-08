class CustomHttpError extends Error {
  constructor({ message }) {
    super(message);
  }

  notFound({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 404;
  }

  badRequest({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 400;
  }

  internalServerError({ method, path }) {
    this.typeError = `[${method}] - ${path}`;
    this.statusCode = 500;
  }
}

export default CustomHttpError;
