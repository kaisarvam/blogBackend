const router = require("express").Router();
const { controllers: articlesController } = require("../api/v1/article");

router
  .route("/api/v1/articles/")
  .get(articlesController.findAll)
  .post(articlesController.create);

router
  .route("/api/v1/articles/:id")
  .get(articlesController.findSingle)
  .put(articlesController.updateItem)
  .patch(articlesController.updateItemPatch)
  .delete(articlesController.removeItem);

router.get("/test", (req, res) => {
  res.json({ message: "Hello" });
});

module.exports = router;
