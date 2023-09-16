const articleService = require("../../../../lib/article");

const updateItemPatch = async (req, res, next) => {
  const id = req.params.id;
  const cover = req.body.cover;
  try {
    const article = await articleService.updateArticle(id, {
      title: req.body.title,
      body: req.body.body,
      cover,
      status: req.body.status,
    });
    const response = {
      code: 200,
      message: "Article updated Successfully !",
      data: article,
      links: {
        self: `/articles/${article._id}`,
      },
    };
    res.status(200).json(response);
  } catch (e) {
    console.log("error message: ", e.message);
    next(e);
  }
};

module.exports = updateItemPatch;
