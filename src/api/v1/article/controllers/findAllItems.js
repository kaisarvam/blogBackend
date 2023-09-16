const defaults = require("../../../../config/defaults");
const articleService = require("../../../../lib/article");
const { getPagination, getHATEOASForAllItems } = require("../../../../utils");
const { getTransformedData } = require("../../../../utils/query");

const findAll = async (req, res, next) => {
  const page = parseInt(req.query.page) || defaults.page;
  const limit = parseInt(req.query.limit) || defaults.limit;
  const sortType = req.query.sort_type || defaults.sort_type;
  const sortKey = req.query.sort_by || defaults.sort_by;
  const search = req.query.search || defaults.search;

  try {
    const articles = await articleService.findAllArticles({
      page,
      limit,
      sortType,
      sortKey,
      search,
    });

    const data = getTransformedData({
      items: articles,
      selection: ["title", "body", "cover", "status", "author", "id"],
      path: "/articles",
    });
    console.log("transformed data :", data);

    const totalItems = await articleService.count({ search });

    const pagination = getPagination({ totalItems, limit, page });
    const links = getHATEOASForAllItems({
      url: req.url,
      path: req.path,
      query: req.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });

    res.status(200).json({
      status: "success",
      data,
      pagination,
      links,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = findAll;
