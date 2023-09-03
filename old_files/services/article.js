require("dotenv").config();
const Article = require("../models/Articles");
const databaseConnection = require("../db");

const PORT = process.env.PORT || 3000;

const findArticles = async ({ page, limit, sortType, sortBy, searchTerm }) => {
  //get articles
  const articleInstance = new Article(databaseConnection.db.articles);
  let articles;

  if (searchTerm) {
    articles = await articleInstance.search(searchTerm);
  } else {
    articles = await articleInstance.find();
  }

  //sorting articles
  articles = await articleInstance.sort(sortType, sortBy);

  //pagination
  const { result, totalItems, totalPage, hasNext, hasPrev } =
    await articleInstance.pagination(page, limit, articles);
  return {
    totalItems,
    totalPage,
    hasNext,
    hasPrev,
    articles: result,
  };
};

const transformedArticles = ({ articles = [] }) => {
  return articles.map((article) => {
    const transformed = { ...article };
    transformed.author = {
      id: transformed.authorId,
    };
    transformed.link = `http://localhost:${PORT}/api/v1/articles/${transformed.id}`;
    delete transformed.body;
    delete transformed.authorId;
    return transformed;
  });
};

const  createArticle = async ({title,body,cover='',status='draft'}) => {
const articleInstance = new Article(databaseConnection.db.articles);
const article = await articleInstance.create({title,body,cover,status},databaseConnection);
return article;
}

module.exports = {
  findArticles,
  transformedArticles,
  createArticle
};
