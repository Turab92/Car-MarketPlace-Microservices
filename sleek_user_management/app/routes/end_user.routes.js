const controller = require("../controllers/end_user.controller");
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIAQYPAYLCQQHCEQUG5',
  secretAccessKey: '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',
  region: 'ap-southeast-1'
 });
 
 // Create an S3 instance
 const s3 = new AWS.S3();
 
 // Configure Multer to use multer-s3 as storage
 const upload = multer({
     storage: multerS3({
     s3 :s3,
     bucket: 'sleekride',
     key: function (req, file, cb) {
     cb(null, 'sleek_user_management/EndUserImage/' + new Date().getTime().toString() + "-" + file.fieldname + path.extname(file.originalname)); // Set the desired file path on S3
     },
     acl: 'public-read' // Set the desired ACL for uploaded files
     })
 });

module.exports = function (app, passport) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.post("/api/auth/usersignup", upload.single("end_UserImage"), controller.validate('createUser'), controller.signup);
  app.post("/api/auth/createdealer", upload.single("end_UserImage"), controller.validate('createUser'), controller.create);
  app.post("/api/auth/enduserverifycode", controller.VerifyCode);
  app.post("/api/auth/endusercheckmail", controller.CheckUserEmail);
  app.post("/api/auth/enduserlogin", controller.signin);
  app.get("/api/auth/enduserloggedin", controller.loggedIn);

  //Google Authentication
  app.post("/api/auth/googleSignIn", controller.validate('socialUser'), controller.googleSignIn);
  app.post("/api/auth/facebookSignIn", controller.validate('socialUser'), controller.facebookSignIn);
  app.post("/api/auth/appleSignIn", controller.validate('appleUser'), controller.appleSignIn);

 //EndUser APIs
  app.get("/api/endusr/enduserlogout", controller.logout);
  app.put("/api/endusr/updateenduser/:id",upload.single("end_UserImage"), controller.validate('updateUser'), controller.update);
  app.get("/api/endusr/getenduser", controller.findOneUser);
  app.get("/api/endusr/getenduser/:id", controller.findOneUserParams);
 
  //Admin APIs
  app.get("/api/usr/allendusers", controller.findAll);
  app.get("/api/usr/activeendusers", controller.findActive);
  app.get("/api/usr/catendusers/:id", controller.findAllByCat);
  app.get("/api/usr/extractenduser/:id", controller.findOne);
  app.delete("/api/usr/deleteenduser/:id", controller.delete);
};