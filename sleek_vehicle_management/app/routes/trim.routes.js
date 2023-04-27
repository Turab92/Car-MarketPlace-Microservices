const controller = require("../controllers/trim.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //EndUser APIs
  app.get("/api/vce/endusr/activeTrim", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addTrim", controller.validate("createTrim"), controller.create);
  app.get("/api/vce/usr/allTrim", controller.findAll);
  app.get("/api/vce/usr/extractTrim/:id", controller.findOne);
  app.put("/api/vce/usr/updateTrim/:id", controller.validate("updateTrim"), controller.update);
  app.delete("/api/vce/usr/deleteTrim/:id", controller.delete);
};
