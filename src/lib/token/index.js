const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SECRET,
}) => {
  try {
    return jwt.sign(payload, secret, {
      algorithm: algorithm,
    });
  } catch (e) {
    console.log("[JWT ERROR]", e);
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm: [algorithm] });
  } catch (e) {
    console.log("[JWT ERROR]", e);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  secret = process.env.ACCESS_TOKEN_SECRET,
  algorithm = "HS256",
}) => {
  try {
    return jwt.verify(token, secret, { algorithm: [algorithm] });
  } catch (e) {
    console.log("[JWT ERROR]", e);
    throw serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};
