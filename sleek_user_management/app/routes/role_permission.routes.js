const controller = require("../controllers/role_permission.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/usr/addrolperm",controller.validate('createRolePermission'), controller.create);
  app.get("/api/usr/allrolperm", controller.findAll);
  app.get("/api/usr/extractrolperm/:id", controller.findOne);
  app.get("/api/usr/main_rolperm/:id", controller.findmain);
  app.put("/api/usr/updaterolperm/:id", controller.validate('updateRolePermission'), controller.update);
  app.delete("/api/usr/deleterolperm/:id", controller.delete);
};