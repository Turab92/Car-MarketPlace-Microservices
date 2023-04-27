const controller = require("../controllers/city.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activecity", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addcity", controller.validate("createCity"), controller.create);
  app.get("/api/vce/usr/allcity", controller.findAll);
  app.get("/api/vce/usr/extractcity/:id", controller.findOne);
  app.put("/api/vce/usr/updatecity/:id", controller.validate("updateCity"), controller.update);
  app.delete("/api/vce/usr/deletecity/:id", controller.delete);
};
