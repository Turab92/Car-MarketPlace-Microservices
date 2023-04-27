const controller = require("../controllers/email_notification.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/endusr/addEmailNotification", controller.create);
  app.get("/api/endusr/allEmailNotification", controller.findAll);
  app.get("/api/endusr/activeEmailNotification", controller.findActive);
  app.get("/api/endusr/extractEmailNotification/:endUserID", controller.findOne);
  app.put("/api/endusr/updateEmailNotification/:endUserID", controller.update);
  app.delete("/api/endusr/deleteEmailNotification/:endUserID", controller.delete);
};
