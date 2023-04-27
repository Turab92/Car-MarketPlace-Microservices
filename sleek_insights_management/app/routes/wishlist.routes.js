const controller = require("../controllers/wishlist.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/ins/endusr/add_wishlist", controller.create);
  app.get("/api/ins/endusr/getall_wishlist/:enduserid", controller.findAll);
  app.get("/api/ins/endusr/get_wishlist/:enduserid/:postid", controller.findOne);
};
