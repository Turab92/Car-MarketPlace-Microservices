const controller = require("../controllers/check_availability.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/add_check_availability", controller.create);
  app.get("/api/ins/endusr/getall_check_availability", controller.findAll);
  app.get("/api/ins/endusr/get_check_availability/:id", controller.findOne);
};
