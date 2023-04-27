const controller = require("../controllers/post_condition_histrory.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activepostConditionHistory", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addpostConditionHistory", controller.validate("createPostConditionHistory"), controller.create);
  app.get("/api/vce/usr/allpostConditionHistory", controller.findAll);
  app.get("/api/vce/usr/extractpostConditionHistory/:id", controller.findOne);
  app.put("/api/vce/usr/updatepostConditionHistory/:id", controller.validate("updatePostConditionHistory"), controller.update);
  app.delete("/api/vce/usr/deletepostConditionHistory/:id", controller.delete);
};
