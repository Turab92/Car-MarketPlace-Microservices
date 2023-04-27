const controller = require("../controllers/vehicle_make.controller");
const path = require("path");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: "./public/MakeLogo",
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + "-" +  file.fieldname + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storageFile }).single("makeLogo");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.get("/api/vce/view/activeMake", controller.findActive);

  //EndUser APIs
  app.get("/api/vce/endusr/activeMake", controller.findActive);
  
  //Admin APIs
  app.post("/api/vce/usr/addMake", upload, controller.validate("createMake"), controller.create);
  app.get("/api/vce/usr/allMake", controller.findAll);
  app.get("/api/vce/usr/extractMake/:id", controller.findOne);
  app.put("/api/vce/usr/updateMake/:id", upload, controller.validate("updateMake"), controller.update);
  app.delete("/api/vce/usr/deleteMake/:id", controller.delete);
};
