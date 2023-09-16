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

    const response = {
      code: 201,
      message: "Article successfully created !!",
      data: { ...article._doc },
      links: {
        self: `/articles/${article.id}`,
        author: `/articles/${article.id}/author`,
        comments: `/articles/${article.id}/comments`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = create;
