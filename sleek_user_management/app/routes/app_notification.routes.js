const controller = require("../controllers/app_notification.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/endusr/addAppNotification", controller.create);
  app.get("/api/endusr/allAppNotification", controller.findAll);
  app.get("/api/endusr/activeAppNotification", controller.findActive);
  app.get("/api/endusr/extractAppNotification/:endUserID", controller.findOne);
  app.put("/api/endusr/updateAppNotification/:endUserID", controller.update);
  app.delete("/api/endusr/deleteAppNotification/:endUserID", controller.delete);
};
