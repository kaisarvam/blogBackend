const { createArticle } = require("../../../../lib/article");

const create = async (req, res, next) => {
  const { title, body, cover, status } = req.body;

  try {
    const article = await createArticle({
      title,
      body,
      cover,
      status,
      author: req.user,
    });
    res
      .status(201)
      .json({ article, message: "Article successfully created !!" });
  } catch (error) {
    next(error);
  }
};

module.exports = create;
