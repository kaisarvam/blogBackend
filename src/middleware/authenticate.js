const authenticate = (req, _res, next) => {
  req.user = {
    id: "64fc252358b44900072f52f0",
    name: "John Doe",
    email: "johnDoe@gmail.com",
    role: "user",
  };
  next();
};

module.exports = authenticate;
