const controller = require("../controllers/internal_user.controller");
const path = require("path");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: "./public/UserImage",
  filename: function (req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() + "-" + 
      file.fieldname + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storageFile }).single("userImage");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Without Token
  app.post("/api/auth/createuser", upload, controller.validate('createUser'), controller.create);
  app.post("/api/auth/verifycode", controller.VerifyCode);
  app.post("/api/auth/checkmail", controller.CheckUserEmail);
  app.post("/api/auth/login", controller.signin);
  app.get("/api/auth/loggedin", controller.loggedIn);

  //Token Required
  app.get("/api/usr/logout", controller.logout);
  app.get("/api/usr/allinternalusers", controller.findAll);
  app.get("/api/usr/activeinternalusers", controller.findActive);
  app.get("/api/usr/roleinternalusers/:id", controller.findAllByRole);
  app.get("/api/usr/extractinternaluser/:id", controller.findOne);
  app.put("/api/usr/updateinternaluser/:id",upload, controller.validate('updateUser'), controller.update);
  app.delete("/api/usr/deleteinternaluser/:id", controller.delete);
};