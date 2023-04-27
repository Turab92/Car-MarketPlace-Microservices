const JsonWebToken = require("jsonwebtoken");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const config = require("../config/auth");
const { InternalUser } = require("../models/internal_user.model");
const { InternalUserSession } = require("../models/session.model");

var passwordValidator = require('password-validator');
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                 // Must have at least 1 digits
.has().symbols(1)                                // Must have at least 1 symbol
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Password', 'Password123']); // Blacklist these values

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "setPassword": {
      return [
        body("email", "Email is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
      ];
    }
    case "changePassword": {
      return [
        body("userID", "User id is required").notEmpty(),
        body("oldPassword", "Old Password is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
      ];
    }
    case "setEndUserPass": {
      return [
        body("end_email", "Email is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
      ];
    }
    case "changeEndUserPass": {
      return [
        body("endUserID", "User id is required").notEmpty(),
        body("oldPassword", "Old Password is required").notEmpty(),
        body("newPassword", "New Password is required").notEmpty(),
        body("confirmPassword", "Confirm Pass is required").notEmpty(),
      ];
    }
  }
};

exports.SetUserPassword = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  const passValidation = schema.validate(req.body.confirmPassword, { details: true })

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    InternalUser.findOne({ email: req.body.email, is_verified: 1 })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not Found or Not Verified!" });
        } else {
          if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(401).send({
              message: "New Password and Confirm password not match!",
            });
          } else {
            if(passValidation.length){
              res.status(422).json({ errors: passValidation });
              return;
            }
            var query = { email: req.body.email };
            InternalUser.findOneAndUpdate(
              query,
              {
                password: Bcrypt.hashSync(req.body.confirmPassword, 8),
                is_registered: 1,
              },
              { upsert: true }
            ).then((data) => {
              if (data[0] != 0) {
                const token = JsonWebToken.sign(
                  { user },
                  config.SECRET_JWT_CODE,
                  {
                    expiresIn: config.EXPIRES_IN,
                  }
                );

                InternalUserSession.create({
                  userID: user._id,
                  token: token,
                })
                .then((sessions) => {
                  InternalUserSession.findOne({ token: token })
                  .then((sessions) => {
                    res.status(200).send({
                      data: user,
                      accessToken: sessions.token,
                    });
                  });
                });
              } else {
                res.status(500).send({
                  message: `Cannot set password User with id=${req.body._id}`,
                });
              }
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.ChangePassword = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  const passValidation = schema.validate(req.body.confirmPassword, { details: true })

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    InternalUser.find({ _id: new Mongoose.Types.ObjectId(req.body.userID) })
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "User Not Found",
          });
        } else {
          var passwordIsValid = Bcrypt.compareSync(
            req.body.oldPassword,
            data[0].password
          );
          if (!passwordIsValid) {
            res.status(203).send({
              message: "Old Password did not match",
            });
          } else {
            if (req.body.newPassword == req.body.confirmPassword) {
              if (req.body.oldPassword == req.body.newPassword) {
                res.status(203).send({
                  message: "Old Password and New Password couldn't be same",
                });
              } else {
                if(passValidation.length){
                  res.status(422).json({ errors: passValidation });
                  return;
                }
                InternalUser.findOneAndUpdate(
                  { _id: new Mongoose.Types.ObjectId(req.body.userID) }, //where UserId
                  { password: Bcrypt.hashSync(req.body.newPassword, 8) }, // user update
                  { upsert: true }
                ).then((data) => {
                  if (data[0] != 0) {
                    res.status(200).send({
                      message: "User was updated successfully",
                    });
                  } else {
                    res.status(500).send({
                      message: `Cannot update User with id=${req.body.userID}`,
                    });
                  }
                });
              }
            } else {
              res.status(203).send({
                message: "New Password and Confirm Password did not match",
              });
            }
          }
        }
      })
      .catch((err) => {
        res.status(502).send({
          message: err.message || "Some error occured while retrieving Users",
        });
      });
  }
};

const EndUser = require("../models/end_user.model").EndUser;
const EndUserSession = require("../models/session.model").EndUserSession;


exports.SetEndUserPassword = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  const passValidation = schema.validate(req.body.confirmPassword, { details: true })

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    EndUser.findOne({ end_email: req.body.end_email, is_verified: 1 })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not Found or Not Verified!" });
        } else {
          if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(401).send({
              message: "New Password and Confirm password not match!",
            });
          } else {
            if(passValidation.length){
              res.status(422).json({ errors: passValidation });
              return;
            }
            var query = { end_email: req.body.end_email };
            EndUser.findOneAndUpdate(
              query,
              {
                end_password: Bcrypt.hashSync(req.body.confirmPassword, 8),
                is_registered: 1,
              },
              { upsert: true }
            ).then((data) => {
              if (data[0] != 0) {
                const token = JsonWebToken.sign(
                  { user },
                  config.SECRET_JWT_CODE,
                  {
                    expiresIn: config.EXPIRES_IN,
                  }
                );

                EndUserSession.create({
                  endUserID: user._id,
                  token: token,
                })
                .then((sessions) => {
                  EndUserSession.findOne({ token: token })
                  .then((sessions) => {
                    res.status(200).send({
                      data: user,
                      accessToken: sessions.token,
                    });
                  });
                });
              } else {
                res.status(500).send({
                  message: `Cannot set password User with id=${req.body._id}`,
                });
              }
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.ChangeEndUserPassword = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  const passValidation = schema.validate(req.body.confirmPassword, { details: true })

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    EndUser.find({ _id: new Mongoose.Types.ObjectId(req.body.endUserID) })
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "User Not Found",
          });
        } else {
          var passwordIsValid = Bcrypt.compareSync(
            req.body.oldPassword,
            data[0].end_password
          );
          if (!passwordIsValid) {
            res.status(203).send({
              message: "Old Password did not match",
            });
          } else {
            if (req.body.newPassword == req.body.confirmPassword) {
              if (req.body.oldPassword == req.body.newPassword) {
                res.status(203).send({
                  message: "Old Password and New Password couldn't be same",
                });
              } else {
                if(passValidation.length){
                  res.status(422).json({ errors: passValidation });
                  return;
                }
                EndUser.findOneAndUpdate(
                  { _id: new Mongoose.Types.ObjectId(req.body.endUserID) }, //where UserId
                  { end_password: Bcrypt.hashSync(req.body.newPassword, 8) }, // user update
                  { upsert: true }
                ).then((data) => {
                  if (data[0] != 0) {
                    res.status(200).send({
                      message: "User was updated successfully",
                    });
                  } else {
                    res.status(500).send({
                      message: `Cannot update User with id=${req.body.endUserID}`,
                    });
                  }
                });
              }
            } else {
              res.status(203).send({
                message: "New Password and Confirm Password did not match",
              });
            }
          }
        }
      })
      .catch((err) => {
        res.status(502).send({
          message: err.message || "Some error occured while retrieving Users",
        });
      });
  }
};
