const controller = require("../controllers/transmission.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activeTransmission", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addTransmission", controller.validate("createTransmission"), controller.create);
  app.get("/api/vce/usr/allTransmission", controller.findAll);
  app.get("/api/vce/usr/extractTransmission/:id", controller.findOne);
  app.put("/api/vce/usr/updateTransmission/:id", controller.validate("updateTransmission"), controller.update);
  app.delete("/api/vce/usr/deleteTransmission/:id", controller.delete);
};
