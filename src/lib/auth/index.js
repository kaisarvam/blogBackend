const { badRequest } = require("../../utils/error");
const { generateHash } = require("../../utils/hashing");
const { userExsist, createUser } = require("../user");

const register = async ({ name, email, password }) => {
  const hasUser = await userExsist(email);
  if (hasUser) {
    throw badRequest("User already exsists !");
  } else {
    password = await generateHash(password);
    const user = await createUser({ name, email, password });
    //generate token
    //send varifiacation email
    // broadcast event
  }
};
