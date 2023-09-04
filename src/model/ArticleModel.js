const { model, Schema } = require("mongoose");

const articleSchema = new Schema(
  {
    title: String,
    body: String,
    status: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
    author: {
      type: Schema.ObjectId,
      ref: "User",
    },
    article: {
      type: Schema.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const ArticleModel = model("Article", articleSchema);
module.exports = ArticleModel;
