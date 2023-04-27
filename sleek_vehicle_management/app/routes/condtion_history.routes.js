const controller = require("../controllers/condtion_history.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activecondtionHistory", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addcondtionHistory", controller.validate("createCondtionHistory"), controller.create);
  app.get("/api/vce/usr/allcondtionHistory", controller.findAll);
  app.get("/api/vce/usr/extractcondtionHistory/:id", controller.findOne);
  app.put("/api/vce/usr/updatecondtionHistory/:id", controller.validate("updateCondtionHistory"), controller.update);
  app.delete("/api/vce/usr/deletecondtionHistory/:id", controller.delete);
};
