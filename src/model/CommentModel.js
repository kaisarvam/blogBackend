const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    body: String,
    status: {
      type: String,
      default: "Public",
      enum: ["Public", "Private"],
    },
    authorId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    articleId: {
      type: Schema.ObjectId,
      ref: "Article",
    },
  },
  {
    timestamps: true,
    id: true,
    strict: false,
  }
);

const CommentModel = model("Comment", commentSchema);
module.exports = { CommentModel };
