const JsonWebToken = require("jsonwebtoken");
const config = require("../config/auth");

var user = async function (token) {
  try {
    // const token = req.header("auth-token");
    var decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);

    // Fetch the user
    var user = decoded.user;
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  user: user,
};
