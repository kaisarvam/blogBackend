const { ArticleModel } = require("../../model");
const { notFound } = require("../../utils");
const { badRequest } = require("../../utils");

// These Paths are not permitted
const restrictedPaths = [
  "id",
  "_id",
  "createdAt",
  "updatedAt",
  "__v",
  "author",
];
const updateArticleV2 = async (articleId, operations = []) => {
  if (!articleId) {
    throw new Error("id is required !");
  }

  let article = await ArticleModel.findById(articleId);
  if (!article) {
    throw notFound();
  }

  for (let operation of operations) {
    const { op, path, value } = operation;
    if (restrictedPaths.includes(path)) {
      throw badRequest(`Path (${path}) is not permitted !`);
    }

    switch (op) {
      case "replace":
        article[path] = value;
        break;
      case "add":
        article.set(path, value);
        break;
      case "remove":
        delete article._doc[path];
        break;
      default:
        throw badRequest(`invalid operation (${op}) path (${path})!`);
    }
  }

  await article.save();

  console.log("final :", article._doc);

  return article._doc;
};

// const addProperty = (id, path, value) => {
//   return ArticleModel.findOneAndUpdate(
//     { _id: id },
//     { $set: { [path]: value } },
//     { new: true }
//   );
// };

module.exports = updateArticleV2;
