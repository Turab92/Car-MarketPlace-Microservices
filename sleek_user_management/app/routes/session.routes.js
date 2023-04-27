const controller = require("../controllers/session.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/allinternal", controller.findAllInternal);
  app.post("/auth/allexternal", controller.findAllEndUser);
};
