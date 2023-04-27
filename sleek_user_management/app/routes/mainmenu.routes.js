const controller = require("../controllers/mainmenu.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/usr/addmainmenu",controller.validate('createMainmenu'), controller.create);
  app.get("/api/usr/allmainmenu", controller.findAll);
  app.get("/api/usr/extractmainmenu/:id", controller.findOne);
  app.put("/api/usr/updatemainmenu/:id", controller.validate('updateMainmenu'), controller.update);
  app.delete("/api/usr/deletemainmenu/:id", controller.delete);
};