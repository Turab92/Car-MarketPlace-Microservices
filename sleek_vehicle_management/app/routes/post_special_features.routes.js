const controller = require("../controllers/post_special_features.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activepostSpecialFeatures", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addpostSpecialFeatures", controller.validate("createPostSpecialFeatures"), controller.create);
  app.get("/api/vce/usr/allpostSpecialFeatures", controller.findAll);
  app.get("/api/vce/usr/extractpostSpecialFeatures/:id", controller.findOne);
  app.put("/api/vce/usr/updatepostSpecialFeatures/:id", controller.validate("updatePostSpecialFeatures"), controller.update);
  app.delete("/api/vce/usr/deletepostSpecialFeatures/:id", controller.delete);
};
