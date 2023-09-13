const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "declined", "blocked"],
    },
  },
  {
    timestamps: true,
    id: true,
  }
);

const UserModel = model("User", userSchema);
module.exports = { UserModel };
