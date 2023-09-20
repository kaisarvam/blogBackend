const router = require("express").Router();
const { controllers: articlesControllerV1 } = require("../api/v1/article");
const { controllers: articlesControllerV2 } = require("../api/v2/article");
const { controllers: authControllerV1 } = require("../api/v1/auth");

// Auth routes

router
  .post("/api/v1/auth/signup", authControllerV1.register)
  .post("/api/v1/auth/signin", authControllerV1.login);

//Articles routes
router
  .route("/api/v1/articles/")
  .get(articlesControllerV1.findAll)
  .post(articlesControllerV1.create);

router
  .route("/api/v1/articles/:id")
  .get(articlesControllerV1.findSingle)
  .put(articlesControllerV1.updateItem)
  .patch(articlesControllerV1.updateItemPatch)
  .delete(articlesControllerV1.removeItem);

router
  .route("/api/v2/articles/:id")
  .patch(articlesControllerV2.updateItemPatch);

router.get("/test", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports = router;
