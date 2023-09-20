const { UserModel } = require("../../model/UserModel");

const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email: email });

  return user ? user : false;
};

const userExsist = async (email) => {
  const user = findUserByEmail(email);
  return user ? true : false;
};

const createUser = async ({ name, email, password }) => {
  const user = new UserModel({ name, email, password });
  await user.save();
  return user._doc;
};
module.exports = { userExsist, createUser };
