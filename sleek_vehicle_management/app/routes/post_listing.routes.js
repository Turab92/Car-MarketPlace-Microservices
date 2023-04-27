const controller = require("../controllers/post_listing.controller");
const path = require("path");
const multer = require("multer");
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// const storageFile = multer.diskStorage({
//   destination: "./public/ListingImages",
//   filename: function (req, file, fn) {
//     fn(null, new Date().getTime().toString() + "-" +  file.fieldname + path.extname(file.originalname));
//   },
// });

//var upload = multer({ storage: storageFile }).array("post_listing_image", 10);
// Set up AWS SDK with your credentials
AWS.config.update({
   accessKeyId: 'AKIAQYPAYLCQQHCEQUG5',
   secretAccessKey: 'w/Eep+vJ3rWjntGr46lO+0CguqixRYdcGw9aYgaT',
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
      cb(null, 'sleek_vehicle_management/post_images/' + file.originalname); // Set the desired file path on S3
      },
      acl: 'public-read' // Set the desired ACL for uploaded files
      })
  });


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.get("/api/vce/view/approvedPostListing", controller.UpdatePost);
  app.get("/api/vce/view/findAllPost", controller.findAllPost);
  app.get("/api/vce/view/findPost/:postid", controller.findSinglePost);


  //EndUser APIs
  app.post("/api/vce/endusr/addPostListing",upload.array("post_listing_image", 10), controller.create);
  app.get("/api/vce/endusr/pendingPostListing", controller.findUserPending);
  app.get("/api/vce/endusr/userPosts", controller.findUserPosts);
  app.get("/api/vce/newsfeed/postnewsfeed", controller.PostListingUsers);
  app.get("/api/vce/endusr/makerPost", controller.PostListingMaker);
  app.get("/api/vce/endusr/similarPosts", controller.SimilarPostListing);
  app.post("/api/vce/endusr/filteredPosts", controller.FilterPostListing);
  app.post("/api/vce/endusr/searchpost", controller.SearchPostListing);
  app.get("/api/vce/endusr/searchkeyword/:search", controller.SearchKeywords);
  
  //Admin APIs
  // app.get("/api/vce/usr/allpostlisting", controller.findAll);
};
