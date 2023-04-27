const controller = require("../controllers/drive_train.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activeDriveTrain", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addDriveTrain", controller.validate("createDriveTrain"), controller.create);
  app.get("/api/vce/usr/allDriveTrain", controller.findAll);
  app.get("/api/vce/usr/extractDriveTrain/:id", controller.findOne);
  app.put("/api/vce/usr/updateDriveTrain/:id", controller.validate("updateDriveTrain"), controller.update);
  app.delete("/api/vce/usr/deleteDriveTrain/:id", controller.delete);
};
