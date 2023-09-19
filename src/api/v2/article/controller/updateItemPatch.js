const articleService = require("../../../../lib/article");

const updateItemPatch = async (req, res, next) => {
  try {
    console.log("req.body :", req.body);
    const article = await articleService.updateArticleV2(
      req.params.id,
      req.body
    );
    res.status(200).json({ message: "Hello from updateItemPatch", article });
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;
