const express = require("express");
const applyMiddleware = require("./middleware");
const routes = require("./routes");

//express app
const app = express();
applyMiddleware(app);
app.use(routes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", health: "OK", user: req.user });
});

app.use("*", (_req, _res, next) => {
  const error = new Error("Requested Resource not found !!");
  error.code = 404;
  error.error = "Not Found";
  next(error);
});

app.use((err, _req, res, next) => {
  console.log("Genarated 404 Error");
  console.log({
    message: err.message,
    code: err.code,
    error: err.error,
  });
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
