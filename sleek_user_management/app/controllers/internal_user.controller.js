const JsonWebToken = require("jsonwebtoken");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const config = require("../config/auth");
const { InternalUser } = require("../models/internal_user.model");
const Session = require("../models/session.model").InternalUserSession;
var nodeMailer = require("nodemailer");
const { NODEMAIL } = require("../config/nodemailer");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("first_name", "First name is required").notEmpty(),
        body("last_name", "Last name is required").notEmpty(),
        body("email", "Invalid email").isEmail(),
        body("email", "Email is required").notEmpty(),
        body("roleID", "Role ID is required").notEmpty(),
      ];
    }
    case "updateUser": {
      return [
        body("first_name", "First name is required").notEmpty(),
        body("last_name", "Last name is required").notEmpty(),
        body('phoneNo', 'Invalid phone number').isInt().optional(),
        body("phoneNo","Minimum 10 and Maximum 15 number required in Phone number").isLength({ min: 10, max: 15 }).optional(),
        body("roleID", "Role ID is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "Status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  var randomnumber = Math.random().toString(36).slice(-8);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;

  } else {
    const internaluser = {
      roleID: req.body.roleID,
      username: req.body.first_name + " " + req.body.last_name,
      email: req.body.email,
      verifyCode: randomnumber,
      is_registered: 0,
      status: 0,
    };

    InternalUser.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          InternalUser.create(internaluser)
            .then((data) => {
              // SEND VERIFICATION MAIL
              if (data) {
                var transport = nodeMailer.createTransport({
                  host: NODEMAIL.MAIL_HOST,
                  port: NODEMAIL.MAIL_PORT,
                  secure: true,
                  requireTLS: true,
                  service: NODEMAIL.MAIL_SERVICE,
                  auth: {
                    user: NODEMAIL.MAIL_USER,
                    pass: NODEMAIL.MAIL_PASSWORD,
                  },
                });
                var mailOptions = {
                  from: NODEMAIL.MAIL_USER, //sender email address
                  to: data.email, //receiver email address
                  subject: NODEMAIL.MAIL_SUBJECT,
                  text: `Hello ${data.username} \n\n\nYou registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
                };
                transport.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.status(501).send({
                      message: error,
                    });
                  } else {
                    console.warn("Email has been sent", info.response);
                    res.status(200).send({
                      message: `Email Verification Code has been sent to your Email Address`,
                      data: data,
                    });
                  }
                });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while create the User",
              });
            });
        } else {
          res.status(400).send({
            message:
              "This email address is already associated with another account",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  }
};

exports.VerifyCode = async (req, res) => {
  const data = await InternalUser.find()
    .where("verifyCode")
    .equals(req.body.verifyCode)
    .exec();

  if (data.length) {
    const data1 = await InternalUser.findOneAndUpdate(
      { _id: new Mongoose.Types.ObjectId(data[0]._id) },
      {is_verified:1, status: 1 },
      { upsert: true }
    );

    res.status(200).send({ message: "Account Verified!!" });

  } else {
    res.status(500).send({
      message: "Some error occured while retrieving User",
    });
  }
};

exports.CheckUserEmail = async (req, res) => {
  InternalUser.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        if (user.is_registered == 1 && user.is_verified == 1) {

          return res.status(200).send({ message: "User Already registered." });

        } else if (user.is_registered == 0 && user.is_verified == 0) {

          var randomnumber = Math.random().toString(36).slice(-8);

          const data1 = await InternalUser.findOneAndUpdate(
            { _id: new Mongoose.Types.ObjectId(user._id) },
            { verifyCode: randomnumber },
            { upsert: true }
          );
          InternalUser.findOne({ _id: data1._id })
          .then((data) => {
            // SEND VERIFICATION MAIL
            if (data) {
              var transport = nodeMailer.createTransport({
                host: NODEMAIL.MAIL_HOST,
                port: NODEMAIL.MAIL_PORT,
                secure: true,
                requireTLS: true,
                service: NODEMAIL.MAIL_SERVICE,
                auth: {
                  user: NODEMAIL.MAIL_USER,
                  pass: NODEMAIL.MAIL_PASSWORD,
                },
              });
              var mailOptions = {
                from: NODEMAIL.MAIL_USER, //sender email address
                to: data.email, //receiver email address
                subject: NODEMAIL.MAIL_SUBJECT,
                text: `Hello ${data.username} \n\n\nYou registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
              };
              transport.sendMail(mailOptions, function (error, info) {
                if (error) {
                  res.status(501).send({
                    message: error,
                  });
                } else {
                  console.warn("Email has been sent", info.response);
                  res.status(401).send({
                    message: `Email Verification Code has been sent to your Email Address`,
                    data: data,
                  });
                }
              });
            }
          });
        } else if (user.is_registered == 0 && user.is_verified == 1) {
          res.status(201).send({
            message: "User not register please set your password",
          });
        }
        else {
          res.status(500).send({
            message: "Some error occured while retrieving User",
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, error: "Send needed params" });
    return;
  }
  InternalUser.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User does not Exist" });
      } else {
        var passwordIsValid = Bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        } else {
          const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
            expiresIn: config.EXPIRES_IN,
          });

          Session.create({
            userID: user._id,
            token: token,
          })
          .then((sessions) => {
            Session.findOne({ token: token }).then((sessions) => {
              res.status(200).send({
                data: user,
                accessToken: sessions.token,
              });
            });
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.loggedIn = (req, res) => {
  if (req.headers && req.header("auth-token")) {
    const token = req.header("auth-token");
    var decoded;
    try {
      decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);
      var userId = decoded.user._id;
      // Fetch the user by id
      InternalUser.findOne({ _id: userId }).then((user) => {
        res.status(200).send(user);
      });
    } catch (e) {
      return res.status(401).send({
        message: "Unauthorized!!",
      });
    }
  }
  else {
    return res.status(409).send({ 
      error: "Access Denied, Something went wrong!!" 
    });
  }
};

exports.logout = (req, res) => {
  const accessToken = req.header("auth-token");
  if (!accessToken) {
    res.status(400).send({
      message: "Authorization token cannot be empty!",
    });
  } else {
    Session.findOneAndUpdate(
      { token: accessToken },
      { blacklist: 1 },
      { upsert: true }
    ).then((data) => {
      if (data) {
        res.status(200).send({
          message: "Logout Successfully",
        });
      } else {
        res.status(500).send({
          message: `Can't blacklist User with token=${accessToken}`,
        });
      }
    });
  }
};

exports.findAll = (req, res) => {
  InternalUser.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving InternalUser",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  InternalUser.find().where('status').equals(1) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Active InternalUser",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findAllByRole = (req, res) => {
  const id = req.params.id;
  InternalUser.find().where('roleID').equals(id) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving User with Role id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  InternalUser.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving User with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    if (req.file == undefined) {
      if (!req.body.phoneNo || req.body.phoneNo == "") {
        const internaluser = {
          roleID: req.body.roleID,
          username: req.body.first_name + " " + req.body.last_name,
          zipCode: req.body.zipCode,
          gender: req.body.gender,
          status: req.body.status,
        };

        var query = { _id: new Mongoose.Types.ObjectId(id) };
        InternalUser.findOneAndUpdate(query, internaluser, {
          upsert: true,
        }).then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "User was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update User with id=${id}`,
            });
          }
        });
      } else {
        InternalUser.findOne({
          _id: new Mongoose.Types.ObjectId(id),
          phoneNo: req.body.phoneNo,
        }).then((data) => {
          if (!data) {
            InternalUser.findOne({ phoneNo: req.body.phoneNo }) //findAll return array
              .then((data) => {
                if (!data) {

                  const internaluser = {
                    roleID: req.body.roleID,
                    username: req.body.first_name + " " + req.body.last_name,
                    phoneNo: req.body.phoneNo,
                    zipCode: req.body.zipCode,
                    gender: req.body.gender,
                    status: req.body.status,
                  };

                  var query = { _id: new Mongoose.Types.ObjectId(id) };
                  InternalUser.findOneAndUpdate(query, internaluser, {
                    upsert: true,
                  }).then((data) => {
                    if (data[0] != 0) {
                      res.status(200).send({
                        message: "User was updated successfully",
                      });
                    } else {
                      res.status(500).send({
                        message: `Cannot update User with id=${id}`,
                      });
                    }
                  });
                } else {
                  res.status(500).send({
                    message: `Phone number already exist.`,
                  });
                }
              });
          } else {

            const internaluser = {
              roleID: req.body.roleID,
              username: req.body.first_name + " " + req.body.last_name,
              zipCode: req.body.zipCode,
              gender: req.body.gender,
              status: req.body.status,
            };

            var query = { _id: new Mongoose.Types.ObjectId(id) };
            InternalUser.findOneAndUpdate(query, internaluser, {
              upsert: true,
            }).then((data) => {
              if (data[0] != 0) {
                res.status(200).send({
                  message: "User was updated successfully",
                });
              } else {
                res.status(500).send({
                  message: `Cannot update User with id=${id}`,
                });
              }
            });
          }
        });
      }
    } else {
      if (
        req.file.mimetype != "image/jpeg" &&
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png"
      ) {
        res.status(400).send({ message: "You can Only Upload Images!!" });
      } else {
        var userImagepath = req.protocol + "://" + req.get("Host") + "/public/UserImage/" + req.file.filename;

        if (!req.body.phoneNo || req.body.phoneNo == "") {

          const internaluser = {
            roleID: req.body.roleID,
            username: req.body.first_name + " " + req.body.last_name,
            zipCode: req.body.zipCode,
            gender: req.body.gender,
            userImage: userImagepath,
            status: req.body.status,
          };

          var query = { _id: new Mongoose.Types.ObjectId(id) };

          InternalUser.findOneAndUpdate(query, internaluser, {
            upsert: true,
          }).then((data) => {
            if (data[0] != 0) {
              res.status(200).send({
                message: "User was updated successfully",
              });
            } else {
              res.status(500).send({
                message: `Cannot update User with id=${id}`,
              });
            }
          });
        } else {
          InternalUser.findOne({ _id: new Mongoose.Types.ObjectId(id), phoneNo: req.body.phoneNo, })
            .then((data) => {
              if (!data) {
                InternalUser.findOne({ phoneNo: req.body.phoneNo }) //findAll return array
                  .then((data) => {
                    if (!data) {

                      const internaluser = {
                        roleID: req.body.roleID,
                        username: req.body.first_name + " " + req.body.last_name,
                        phoneNo: req.body.phoneNo,
                        zipCode: req.body.zipCode,
                        gender: req.body.gender,
                        userImage: userImagepath,
                        status: req.body.status,
                      };

                      var query = { _id: new Mongoose.Types.ObjectId(id) };
                      InternalUser.findOneAndUpdate(query, internaluser, {
                        upsert: true,
                      }).then((data) => {
                        if (data[0] != 0) {
                          res.status(200).send({
                            message: "User was updated successfully",
                          });
                        } else {
                          res.status(500).send({
                            message: `Cannot update User with id=${id}`,
                          });
                        }
                      });
                    } else {
                      res.status(500).send({
                        message: `Phone number already exist.`,
                      });
                    }
                  });
              } else {
                
                const internaluser = {
                  roleID: req.body.roleID,
                  username: req.body.first_name + " " + req.body.last_name,
                  zipCode: req.body.zipCode,
                  gender: req.body.gender,
                  userImage: userImagepath,
                  status: req.body.status,
                };

                var query = { _id: new Mongoose.Types.ObjectId(id) };
                InternalUser.findOneAndUpdate(query, internaluser, {
                  upsert: true,
                }).then((data) => {
                  if (data[0] != 0) {
                    res.status(200).send({
                      message: "User was updated successfully",
                    });
                  } else {
                    res.status(500).send({
                      message: `Cannot update User with id=${id}`,
                    });
                  }
                });
              }
            });
        }
      }
    }
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  InternalUser.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
  .then((data) => {
      if (data) {
        res.status(200).send({
          message: "User was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete User with id=${id}`,
        });
      }
    }
  );
};