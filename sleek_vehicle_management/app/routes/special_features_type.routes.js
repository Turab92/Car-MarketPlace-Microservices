const controller = require("../controllers/special_features_type.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  //Admin APIs
  app.post("/api/vce/usr/addspecialFeaturesType", controller.validate("createSpecialFeaturesType"), controller.create);
  app.get("/api/vce/usr/allspecialFeaturesType", controller.findAll);
  app.get("/api/vce/usr/extractspecialFeaturesType/:id", controller.findOne);
  app.put("/api/vce/usr/updatespecialFeaturesType/:id", controller.validate("updateSpecialFeaturesType"), controller.update);
  app.delete("/api/vce/usr/deletespecialFeaturesType/:id", controller.delete);
};
