require("dotenv").config();
//const OpenApiValidator = require("express-openapi-validator");

const databaseConnection = require("./db");

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const Article = require("./models/Articles");
const articleService = require("./services/article");
const app = express();

const PORT = process.env.PORT || 3000;

// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: "./swagger.yaml",
//   })
// );

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", health: "OK" });
});

app.get("/api/v1/articles", async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sort_type||'dsc' ;
  const sortBy = req.query.sort_by||'updatedAt' ;
  const searchTerm = req.query.search ||'';
  let { totalItems, totalPage, hasNext, hasPrev, articles } =
    await articleService.findArticles({ page, limit,sortType,sortBy,searchTerm });

  //transforming articles

  //response

  const response = {
    data: articleService.transformedArticles({ articles }),
    pagination: {
      page,
      limit,
      totalPage,
      totalItems,
    },
    links: {
      self: `http://localhost:${PORT}/api/v1/articles?page=${page}&limit=${limit}`,
    },
  };
  if (hasPrev) {
    response.pagination.prev = page - 1;
    response.links.prev = `http://localhost:${PORT}/api/v1/articles?page=${
      page - 1
    }&limit=${limit}`;
  }
  if (hasNext) {
    response.pagination.next = page + 1;
    response.links.next = `http://localhost:${PORT}/api/v1/articles?page=${
      page + 1
    }&limit=${limit}`;
  }

  res.status(200).json(response);
});

app.post("/api/v1/articles", (req, res) => {
  console.log("request body :",req.body);
  // step 1: destructure the request body
  const {title,body,cover,status} = req.body;
  // step 2: invoke the service function

 const article = articleService.createArticle({title,body,cover,status});

  // step 3: generate the response

  const response = {
    code:201,
    message:"Article created successfully",
    data:article,
    links:{
      self:`${req.url}/api/v1/articles/${article.id}`
    }
  }

  res
    .status(200)
    .json({ path: "/articles", method: "POST", message: "POST articles" });
});

app.get("/api/v1/articles/:id", (req, res) => {
  res
    .status(200)
    .json({ path: "/articles/:id", method: "GET", message: "GET articles" });
});

app.put("/api/v1/articles/:id", (req, res) => {
  res
    .status(200)
    .json({ path: "/articles/:id", method: "PUT", message: "PUT articles" });
});

app.patch("/api/v1/articles/:id", (req, res) => {
  res.status(200).json({
    path: "/articles/:id",
    method: "PATCH",
    message: "PATCH articles",
  });
});

app.get("/api/v1/articles", (req, res) => {
  res.status(200).json({ message: "GET articles" });
});

app.delete("/api/v1/articles", (req, res) => {
  res
    .status(200)
    .json({ path: "/articles", method: "DELETE", message: "DELETE articles" });
});

app.post("/api/v1/auth/signup", (req, res) => {
  res
    .status(200)
    .json({ path: "/auth/signup", method: "POST", message: "POST signup" });
});

app.post("/api/v1/auth/signin", (req, res) => {
  res
    .status(200)
    .json({ path: "/auth/signin", method: "POST", message: "POST signin" });
});

// app.use((err, req, res, next) => {
//   // format error
//   console.log("request body :",req?.body);
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors,
//   });
// });

// db.connect().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

(async () => {
  await databaseConnection.connect();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
