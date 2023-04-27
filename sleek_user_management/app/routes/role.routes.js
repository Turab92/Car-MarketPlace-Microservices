const controller = require("../controllers/role.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/usr/addrole", controller.create);
  app.get("/api/usr/allrole", controller.findAll);
  app.get("/api/usr/activerole", controller.findActive);
  app.get("/api/usr/extractrole/:id", controller.findOne);
  app.put("/api/usr/updaterole/:id", controller.update);
  app.delete("/api/usr/deleterole/:id", controller.delete);
};
