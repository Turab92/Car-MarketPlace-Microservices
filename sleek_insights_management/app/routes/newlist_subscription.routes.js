const controller = require("../controllers/newlist_subscription.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/add_newlist_subscription", controller.create);
  app.get("/api/ins/endusr/getall_newlist_subscription", controller.findAll);
  app.get("/api/ins/internal/getall_newlist_subscrip", controller.findAll);
  app.get("/api/ins/endusr/get_newlist_subscription/:id", controller.findOne);
};
