const login = (req, res, next) => {
  try {
    res.send({ message: "Login", body: req.body });
  } catch (e) {
    next(e);
  }
};

module.exports = login;
