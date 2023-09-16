const articleService = require("../../../../lib/article");

const removeItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    await articleService.removeArticle(id);
    res.status(204).json({ message: "Article deleted Successfully !" });
  } catch (e) {
    console.log("error message: ", e.message);
    next(e);
  }
};

module.exports = removeItem;
