const controller = require("../controllers/monthly_calculator.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/vce/endusr/addmonthly_calculator", controller.create);
  app.get("/api/vce/usr/allmonthly_calculator", controller.findAll);
  app.get("/api/vce/usr/activemonthly_calculator", controller.findActive);
  app.get("/api/vce/endusr/extractmonthly_calculator", controller.findOne);
  app.put("/api/vce/endusr/updatemonthly_calculator/:id", controller.update);
  app.delete("/api/vce/endusr/deletemonthly_calculator/:id", controller.delete);
};
