const controller = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/usr/addcategory", controller.create);
  app.get("/api/usr/allcategory", controller.findAll);
  app.get("/api/usr/activecategory", controller.findActive);
  app.get("/api/usr/extractcategory/:id", controller.findOne);
  app.put("/api/usr/updatecategory/:id", controller.update);
  app.delete("/api/usr/deletecategory/:id", controller.delete);
};
