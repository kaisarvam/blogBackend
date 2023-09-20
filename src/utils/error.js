const notFound = (msg = "Resource not found !") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};
const badRequest = (msg = "Bad request !") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};
const serverError = (msg = "Internal server error !") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};
module.exports = {
  notFound,
  badRequest,
  serverError,
};
