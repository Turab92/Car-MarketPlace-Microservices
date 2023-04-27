const controller = require("../controllers/dealer_interacion.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/add_dealer_interaction", controller.create);
  app.get("/api/ins/endusr/getall_interaction", controller.findAll);
  app.get("/api/ins/endusr/get_dealer_interaction/:id", controller.findOne);
};
