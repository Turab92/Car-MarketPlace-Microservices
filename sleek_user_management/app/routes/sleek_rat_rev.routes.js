const controller = require("../controllers/sleek_rat_rev.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/endusr/add_rat_rev", controller.create);
  app.get("/api/usr/all_rat_rev", controller.findAll);
  app.post("/api/endusr/active_rat_rev", controller.findByPlatform);
  app.get("/api/endusr/extract_rat_rev/:id", controller.findOne);
  app.put("/api/endusr/update_rat_rev/:id", controller.update);
  app.delete("/api/endusr/delete_rat_rev/:id", controller.delete);
};
