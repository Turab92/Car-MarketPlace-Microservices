const controller = require("../controllers/special_features.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activespecialFeatures", controller.findActive);
  app.get("/api/vce/endusr/sf_byname/:sf_name", controller.findByName);

  //Admin APIs
  app.post("/api/vce/usr/addspecialFeatures", controller.validate("createSpecialFeatures"), controller.create);
  app.get("/api/vce/usr/allspecialFeatures", controller.findAll);
  app.get("/api/vce/usr/extractspecialFeatures/:id", controller.findOne);
  app.put("/api/vce/usr/updatespecialFeatures/:id", controller.validate("updateSpecialFeatures"), controller.update);
  app.delete("/api/vce/usr/deletespecialFeatures/:id", controller.delete);
};
