const articleService = require("../../../../lib/article");

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const cover = req.body.cover;
  try {
    const { article, status } = await articleService.updateOrCreate(id, {
      title: req.body.title,
      body: req.body.body,
      author: req.user,
      cover,
      status: req.body.status,
    });
    const response = {
      code: status,
      message:
        status === 200
          ? "Article updated Successfully !"
          : "Article created Successfully !",
      data: article,
      links: {
        self: `/articles/${article.id}`,
      },
    };
    res.status(status).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
