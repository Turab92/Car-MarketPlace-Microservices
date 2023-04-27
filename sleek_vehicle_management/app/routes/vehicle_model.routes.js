const controller = require("../controllers/vehicle_model.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.get("/api/vce/view/activeModel", controller.findActive);

  //EndUser APIs
  app.get("/api/vce/endusr/activeModel", controller.findActive);
  app.get("/api/vce/endusr/models/:makerid", controller.findMakerModel);

  //Admin APIs
  app.post("/api/vce/usr/addModel", controller.validate("createModel"), controller.create);
  app.get("/api/vce/usr/allModel", controller.findAll);
  app.get("/api/vce/usr/extractModel/:id", controller.findOne);
  app.put("/api/vce/usr/updateModel/:id", controller.validate("updateModel"), controller.update);
  app.delete("/api/vce/usr/deleteModel/:id", controller.delete);
};
