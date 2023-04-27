const controller = require("../controllers/recent_viewed.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/add_recent_viewed", controller.create);
  app.get("/api/ins/endusr/getall_recent_viewed", controller.findAll);
  app.get("/api/ins/endusr/get_recent_viewed/:id", controller.findOne);
};
