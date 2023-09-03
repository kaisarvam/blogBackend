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
  },
  {
    timestamps: true,
    id: true,
  }
);
