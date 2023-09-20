const bcrypt = require("bcryptjs");
const generateHash = async (payload, saltRound = 10) => {
  const salt = await bcrypt.genSalt(saltRound);
  return bcrypt.hash(payload, salt);
};

const hashMatched = async (raw, hash) => {
  const isMatch = await bcrypt.compare(raw, hash);
  return isMatch;
};

module.exports = {
  generateHash,
  hashMatched,
};
