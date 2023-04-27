const controller = require("../controllers/submenu.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/usr/addsubmenu",controller.validate('createSubmenu'), controller.create);
  app.get("/api/usr/allsubmenu", controller.findAll);
  app.get("/api/usr/extractsubmenu/:id", controller.findOne);
  app.get("/api/usr/main_submenu/:id", controller.findMain);
  app.put("/api/usr/updatesubmenu/:id", controller.validate('updateSubmenu'), controller.update);
  app.delete("/api/usr/deletesubmenu/:id", controller.delete);
};