const controller = require("../controllers/car_maker.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  //app.get("/api/vce/endusr/activecar_maker", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addcar_maker", controller.validate("createCar_makers"), controller.create);
  app.get("/api/vce/usr/allcar_maker", controller.findAll);
  app.get("/api/vce/usr/extractcar_maker/:id", controller.findOne);
  app.put("/api/vce/usr/updatecar_maker/:id", controller.validate("updateCar_makers"), controller.update);
  app.delete("/api/vce/usr/deletecar_maker/:id", controller.delete);
};
