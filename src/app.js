require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");
const mongoose = require("mongoose");
const { seedUser } = require("../seed");

const PORT = process.env.PORT || 3000;

//express app
const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./swagger.yaml",
  })
);

app.use((err, req, res, next) => {
  req.user = {
    id: 999,
    name: "John Doe",
  };
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", health: "OK" });
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = connectionURL.replace("<username>", process.env.DB_USER_NAME);
connectionURL = connectionURL.replace("<password>", process.env.DB_PASSWORD);
connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;

console.log("Connection url :", connectionURL);

mongoose
  .connect(connectionURL, {})
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      seedUser();
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
