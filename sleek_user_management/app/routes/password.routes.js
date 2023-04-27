const controller = require("../controllers/password.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Without Token
  app.post("/api/auth/setpass",controller.validate('setPassword'), controller.SetUserPassword);

  app.post("/api/auth/endusersetpass",controller.validate('setEndUserPass'), controller.SetEndUserPassword);
  
  //Token Required
  app.put("/api/usr/changepassword", controller.validate('changePassword'), controller.ChangePassword);

  app.put("/api/endusr/enduserchangepassword", controller.validate('changeEndUserPass'), controller.ChangeEndUserPassword);
};
