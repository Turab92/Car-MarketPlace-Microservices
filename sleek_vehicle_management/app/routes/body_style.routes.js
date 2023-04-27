const controller = require("../controllers/body_style.controller");
const path = require("path");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: "./public/BodyStyleLogo",
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + "-" +  file.fieldname + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storageFile }).single("bodyStyleLogo");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.get("/api/vce/view/activeBodyStyle", controller.findActive);

  //Admin APIs
  app.post("/api/vce/usr/addBodyStyle",upload, controller.validate("createbodyStyle"), controller.create);
  app.get("/api/vce/usr/allBodyStyle", controller.findAll);
  app.get("/api/vce/usr/extractBodyStyle/:id", controller.findOne);
  app.put("/api/vce/usr/updateBodyStyle/:id",upload, controller.validate("updatebodyStyle"), controller.update);
  app.delete("/api/vce/usr/deleteBodyStyle/:id", controller.delete);
};
