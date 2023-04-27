const controller = require("../controllers/condition_history_type.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  //Admin APIs
  app.post("/api/vce/usr/addcondtionHistoryType", controller.validate("createCondtionHistoryType"), controller.create);
  app.get("/api/vce/usr/allcondtionHistoryType", controller.findAll);
  app.get("/api/vce/usr/extractcondtionHistoryType/:id", controller.findOne);
  app.put("/api/vce/usr/updatecondtionHistoryType/:id", controller.validate("updateCondtionHistoryType"), controller.update);
  app.delete("/api/vce/usr/deletecondtionHistoryType/:id", controller.delete);
};
