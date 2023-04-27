const controller = require("../controllers/color.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activecolor", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addcolor", controller.validate("createColor"), controller.create);
  app.get("/api/vce/usr/allcolor", controller.findAll);
  app.get("/api/vce/usr/extractcolor/:id", controller.findOne);
  app.put("/api/vce/usr/updatecolor/:id", controller.validate("updateColor"), controller.update);
  app.delete("/api/vce/usr/deletecolor/:id", controller.delete);
};
