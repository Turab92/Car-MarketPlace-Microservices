const controller = require("../controllers/vehicle_year.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activeYear", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addYear", controller.validate("createYear"), controller.create);
  app.get("/api/vce/usr/allYear", controller.findAll);
  app.get("/api/vce/usr/extractYear/:id", controller.findOne);
  app.put("/api/vce/usr/updateYear/:id", controller.validate("updateYear"), controller.update);
  app.delete("/api/vce/usr/deleteYear/:id", controller.delete);
};
