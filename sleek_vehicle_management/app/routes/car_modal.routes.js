const controller = require("../controllers/car_modal.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  //Admin APIs
  app.post("/api/vce/usr/addcar_modal", controller.validate("createCar_modal"), controller.create);
  app.get("/api/vce/usr/allcar_modal", controller.findAll);
  app.get("/api/vce/usr/extractcar_modal/:id", controller.findOne);
  app.put("/api/vce/usr/updatecar_modal/:id", controller.validate("updateCar_modal"), controller.update);
  app.delete("/api/vce/usr/deletecar_modal/:id", controller.delete);
};
