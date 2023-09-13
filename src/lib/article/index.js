const { de } = require("@faker-js/faker");
const defaults = require("../../config/defaults");
const { ArticleModel } = require("../../model");

const createArticle = async ({
  title,
  body = "",
  cover = "",
  status = "draft",
  author,
}) => {
  if (!title || !author) {
    const error = new Error("invalid parameters !");
    error.sttus = 400;
    throw error;
  }
  const article = new ArticleModel({
    title,
    body,
    cover,
    status,
    author: author.id,
  });

  return article.save();
};

const findAllArticles = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sort_type,
  sortKey = defaults.sort_by,
  search = defaults.search,
}) => {
  //const filter = {};
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortKey}`;
  console.log("sort string  :", sortStr);

  const articles = await ArticleModel.find({
    title: { $regex: search, $options: "i" },
  })
    .populate({ path: "author", select: "name email" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return articles.map((article) => ({
    ...article._doc,
    id: article.id,
  }));
};

const count = async ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  return ArticleModel.count(filter);
};

module.exports = { findAllArticles, createArticle, count };
