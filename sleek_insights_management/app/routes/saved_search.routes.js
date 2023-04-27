const controller = require("../controllers/saved_search.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/addsaved_search", controller.create);
  app.get("/api/ins/endusr/allsaved_search", controller.findAll);
  app.get("/api/ins/endusr/extractsaved_search/:id", controller.findOne);
  app.put("/api/ins/endusr/updatesaved_search/:id",  controller.update);
  app.delete("/api/ins/endusr/deletesaved_search/:id", controller.delete);
};