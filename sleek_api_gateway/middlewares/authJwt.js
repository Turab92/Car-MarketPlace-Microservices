const JsonWebToken = require("jsonwebtoken");
const config = require("../config/auth");
const { httpStatus } = require("../config/status");
const request = require("request");
const urls = require("../URLs");

exports.verifyMainToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ error: "Access Denied, token required" });
  }

  POST_API = urls.USERS_API_URL + "/auth/allinternal";
  request.post(POST_API, { json: { token: token } }, (err, body) => {
    if (err) {
      return console.log(err);
    }
    var body = body.body;

    try {
      if (!body.length) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "Invalid Token!!" });
      }

      JsonWebToken.verify(token, config.SECRET_JWT_CODE, async (err, decoded) => {
          if (err) {
            return res.status(httpStatus.UNAUTHORIZED).send({
              message: "Unauthorized!!",
            });
          }
          else{
            req.user = decoded.user;
            next();
          }
        }
      );
    } catch (err) {
      return res
        .status(httpStatus.CONFLICT)
        .send({ error: "Access Denied, Something went wrong!!" });
    }
  });
};

exports.verifyToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(httpStatus.NOT_FOUND)
      .send({ error: "Access Denied, token required" });
  }

  POST_API = urls.USERS_API_URL + "/auth/allexternal";
  request.post(POST_API, { json: { token: token } }, (err, body) => {
    if (err) {
      return console.log(err);
    }
    var body = body.body;

    try {
      if (!body.length) {
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "Invalid Token!!" });
      }

      JsonWebToken.verify(token, config.SECRET_JWT_CODE, async (err, decoded) => {
          if (err) {
            return res.status(401).send({
              message: "Unauthorized!!",
            });
          }
          else{
            req.user = decoded.user;
            next();
          }
          
        }
      );
    } catch (err) {
      return res
        .status(httpStatus.CONFLICT)
        .send({ error: "Access Denied, Something went wrong!!" });
    }
  });
};