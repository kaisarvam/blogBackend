const {
  generateToken,
  decodeToken,
  verifyToken,
} = require("../../../../lib/token");
const { generateHash, hashMatched } = require("../../../../utils/hashing");

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const token = generateToken({ payload: "Hello JWT" });
    console.log("token:", token);
    const decoded = decodeToken({ token });
    console.log("decoded:", decoded);
    const verifytoken = verifyToken({ token: "djgekgydfewdfwuyfyudfjceuw" });
    console.log("verifytoken:", verifytoken);
    res.send({ message: "register", body: req.body });
  } catch (e) {
    next(e);
  }
};

module.exports = register;
