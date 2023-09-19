const { de } = require("@faker-js/faker");
const defaults = require("../../config/defaults");
const { ArticleModel } = require("../../model");
const { notFound } = require("../../utils");
const updateArticleV2 = require("./updateArticleV2");

/**
 * Create new article
 * @param {*} param0
 * @returns
 */
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

  await article.save();
  return {
    ...article._doc,
    id: article.id,
  };
};

/**
 * Update  article
 * @param {*} param0
 * @returns
 */
const updateArticle = async (id, { title, body, cover, status }) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw notFound();
  }
  const payload = {
    title,
    body,
    cover,
    status,
  };
  Object.keys(payload).forEach((key) => {
    if (payload[key]) {
      article[key] = payload[key];
    }
  });
  await article.save();

  return {
    ...article._doc,
    id: article._id,
  };
};

/**
 * Update or create new article
 * @param {*} param0
 * @returns
 */

const updateOrCreate = async (
  id,
  { title, body, author, cover = "", status = "draft" }
) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    const article = await createArticle({ title, body, author, cover, status });
    return {
      article: { ...article, id: article._id },
      status: 201,
    };
  }
  const payload = {
    title,
    body,
    cover,
    status,
    author: author.id,
  };

  article.overwrite(payload);
  await article.save();
  return {
    article: {
      ...article._doc,
      id: article._id,
    },
    status: 200,
  };
};

/**
 * Find all articles
 * pagination
 * Searching
 * Sorting
 * @param {*} param0
 * @returns
 */
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

/**
 * Find single article
 * @param {*} id
 * @param {*} expand
 * @returns
 */
const findSingleItem = async (id, expand = "") => {
  if (!id) {
    throw new Error("id is required !");
  }

  expand = expand.split(",").map((item) => item.trim());

  const article = await ArticleModel.findById(id);
  if (!article) {
    throw notFound();
  }
  if (expand.includes("author")) {
    await article.populate({ path: "author", select: "name email" });
  }

  if (expand.includes("comments")) {
    await article.populate({ path: "comments" });
  }

  return {
    ...article._doc,
    id: article.id,
  };
};
/**
 * count all articles
 * @param {*} param0
 * @returns
 */
const count = async ({ search = "" }) => {
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  return ArticleModel.count(filter);
};

const removeArticle = async (id) => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    throw notFound();
  }
  //TODO:
  //asycronously delete all associated comments
  return ArticleModel.findByIdAndDelete(id);
};

module.exports = {
  findAllArticles,
  createArticle,
  count,
  findSingleItem,
  updateOrCreate,
  updateArticle,
  removeArticle,
  updateArticleV2,
};
