const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      minlength: 5,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
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
    strict: false,
  }
);

const UserModel = model("User", userSchema);
module.exports = { UserModel };
