const JsonWebToken = require("jsonwebtoken");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const config = require("../config/auth");
const { EndUser } = require("../models/end_user.model");
const { Category } = require("../models/category.model");
const Session = require("../models/session.model").EndUserSession;
var nodeMailer = require("nodemailer");
const { NODEMAIL } = require("../config/nodemailer");
const { AppNotification } = require("../models/app_notification.model");
const { EmailNotification } = require("../models/email_notification.model");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("first_name", "First name is required").notEmpty(),
        body("last_name", "Last name is required").notEmpty(),
        body("end_email", "Invalid email").isEmail(),
        body("end_email", "Email is required").notEmpty(),
      ];
    }
    case "updateUser": {
      return [
        body("first_name", "First name is required").notEmpty(),
        body("last_name", "Last name is required").notEmpty(),
        body('end_phoneNo', 'Invalid phone number').optional().isInt().if(body('end_phoneNo').exists()),
        body("end_phoneNo","Minimum 10 and Maximum 15 number required in Phone number").optional().isLength({ min: 10, max: 15 }).if(body('end_phoneNo').exists()),
        body("status", "status is required").notEmpty(),
        body("status", "Status value must be in integer").isInt(),
      ];
    }
    case "socialUser": {
      return [
        body("profileId", "User Id is required").notEmpty(),
        body("fullName", "User Name is required").notEmpty(),
        body("email", "Email is required").notEmpty(),
      ];
    }
    case "appleUser": {
      return [
        body("profileId", "User Id is required").notEmpty()
      ];
    }
  }
};

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req); // Finds the validation errors
    var randomnumber = Math.random().toString(36).slice(-8);

    const catid = await Category.find()
      .where("catName")
      .equals("sellerorbuyer")
      .exec();

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;

    } else {
      const enduser = {
        catID: catid[0]._id,
        end_username: req.body.first_name + " " + req.body.last_name,
        end_email: req.body.end_email,
        verifyCode: randomnumber,
        is_registered: 0,
        status: 0,
      };

     var user =await EndUser.findOne({ end_email: req.body.end_email })
          if (!user) {
           var data = await EndUser.create(enduser)
                // SEND VERIFICATION MAIL
                if (data) {
                  var arr =[];
                  var app = await app_notification(data._id);
                  var email = await email_notification(data._id);
                  var obj = {
                    userdata: data,
                    appNot: app,
                    emailnot: email,
                  };
                  arr.push(obj);
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
                    to: data.end_email, //receiver email address
                    subject: NODEMAIL.MAIL_SUBJECT,
                    text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
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
                        data: arr,
                      });
                    }
                  });
                }
              
          } else {
            res.status(400).send({
              message: "This email address is already associated with another account",
            });
          }
        
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const errors = validationResult(req); // Finds the validation errors
    var randomnumber = Math.random().toString(36).slice(-8);
    
    const catid = await Category.find()
      .where("catName")
      .equals("dealer")
      .exec();
    

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    } else {
        const enduser = {
          catID: catid[0]._id,
          end_username: req.body.first_name + " " + req.body.last_name,
          end_email: req.body.end_email,
          verifyCode: randomnumber,
          is_registered: 0,
          status: 0,
        };

       var user = await EndUser.findOne({ end_email: req.body.end_email })
            if (!user) {
              var data = await EndUser.create(enduser)
                  // SEND VERIFICATION MAIL
                  if (data) {
                    var arr =[];
                    var app = await app_notification(data._id);
                    var email = await email_notification(data._id);
                    var obj = {
                      userdata: data,
                      appNot: app,
                      emailnot: email,
                    };
                    arr.push(obj);
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
                      to: data.end_email, //receiver email address
                      subject: NODEMAIL.MAIL_SUBJECT,
                      text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
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
                          data: arr,
                        });
                      }
                    });
                  }
                
            } else {
              res.status(400).send({
                message: "This email address is already associated with another account",
              });
            }
          
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.VerifyCode = async (req, res) => {
  const data = await EndUser.find()
    .where("verifyCode")
    .equals(req.body.verifyCode)
    .exec();

  if (data.length) {
    const data1 = await EndUser.findOneAndUpdate(
      { _id: new Mongoose.Types.ObjectId(data[0]._id) },
      {is_verified:1, status: 1 },
     // { returnOriginal: false },
      { upsert: true }
    );
    // const data2 = await EndUser.findOne({ _id: data1._id });
    res.status(200).send({ 
      message: "Account Verified!!",
      data: data1
    });

  } else {
    res.status(500).send({
      message: "Some error occured while retrieving User",
    });
  }
};

exports.CheckUserEmail = async (req, res) => {
  EndUser.findOne({ end_email: req.body.end_email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        if (user.is_registered == 1 && user.is_verified == 1 &&  req.body.is_reset == undefined) {

          return res.status(200).send({ message: "User Already registered." });

        } else if ((user.is_registered == 0 && user.is_verified == 0) || req.body.is_reset == 1) {

          var randomnumber = Math.random().toString(36).slice(-8);

          const data1 = await EndUser.findOneAndUpdate(
            { _id: new Mongoose.Types.ObjectId(user._id) },
            { verifyCode: randomnumber },
            { upsert: true }
          );
          EndUser.findOne({ _id: data1._id })
          .then((data) => {
            // SEND VERIFICATION MAIL
            if (data) {
              var transport = nodeMailer.createTransport({
                host: NODEMAIL.MAIL_HOST,
                port: NODEMAIL.MAIL_PORT,
                secure: true,
                //requireTLS: true,
                service: NODEMAIL.MAIL_SERVICE,
                auth: {
                  user: NODEMAIL.MAIL_USER,
                  pass: NODEMAIL.MAIL_PASSWORD,
                },
              });
              var mailOptions = {
                from: NODEMAIL.MAIL_USER, //sender email address
                to: data.end_email, //receiver email address
                subject: NODEMAIL.MAIL_SUBJECT,
                text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal, before being able to use your account you need to verify that this is your email address by this\n\n VERIFICATION CODE: ${randomnumber} \n\n\n Kind Regards,\n Sleek Rides`,
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
  if (!req.body.end_email || !req.body.end_password) {
    res.json({ success: false, error: "Send needed params" });
    return;
  }
  EndUser.findOne({ end_email: req.body.end_email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User does not Exist" });
      } else {
        var passwordIsValid = Bcrypt.compareSync(
          req.body.end_password,
          user.end_password
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
            endUserID: user._id,
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
      EndUser.findOne({ _id: userId }).then((user) => {
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
    EndUser.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving EndUser",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    EndUser.find().where('status').equals(1) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Active EndUser",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findAllByCat = (req, res) => {
  const id = req.params.id;
  EndUser.find().where('catID').equals(id) //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving User with Category id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  EndUser.findById(id) //fineone or findByPK return object
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
      if (!req.body.end_phoneNo || req.body.end_phoneNo == "") {
        const enduser = {
          catID: req.body.catID,
          end_username: req.body.first_name + " " + req.body.last_name,
          zipCode: req.body.zipCode,
          gender: req.body.gender,
          status: req.body.status,
        };

        var query = { _id: new Mongoose.Types.ObjectId(id) };
        EndUser.findOneAndUpdate(query, enduser, {
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
        EndUser.findOne({
          _id: new Mongoose.Types.ObjectId(id),
          end_phoneNo: req.body.end_phoneNo,
        }).then((data) => {
          if (!data) {
            EndUser.findOne({ end_phoneNo: req.body.end_phoneNo }) //findAll return array
              .then((data) => {
                if (!data) {

                  const enduser = {
                    catID: req.body.catID,
                    end_username: req.body.first_name + " " + req.body.last_name,
                    end_phoneNo: req.body.end_phoneNo,
                    zipCode: req.body.zipCode,
                    gender: req.body.gender,
                    status: req.body.status,
                  };

                  var query = { _id: new Mongoose.Types.ObjectId(id) };
                  EndUser.findOneAndUpdate(query, enduser, {
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

            const enduser = {
              catID: req.body.catID,
              end_username: req.body.first_name + " " + req.body.last_name,
              zipCode: req.body.zipCode,
              gender: req.body.gender,
              status: req.body.status,
            };

            var query = { _id: new Mongoose.Types.ObjectId(id) };
            EndUser.findOneAndUpdate(query, enduser, {
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
        var userImagepath = req.protocol + "://" + req.get("Host") + "/public/EndUserImage/" + req.file.filename;

        if (!req.body.end_phoneNo || req.body.end_phoneNo == "") {

          const enduser = {
            catID: req.body.catID,
            end_username: req.body.first_name + " " + req.body.last_name,
            zipCode: req.body.zipCode,
            gender: req.body.gender,
            end_UserImage: req.file.location,
            status: req.body.status,
          };

          var query = { _id: new Mongoose.Types.ObjectId(id) };

          EndUser.findOneAndUpdate(query, enduser, {
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
          EndUser.findOne({ _id: new Mongoose.Types.ObjectId(id), end_phoneNo: req.body.end_phoneNo, })
            .then((data) => {
              if (!data) {
                EndUser.findOne({ end_phoneNo: req.body.end_phoneNo }) //findAll return array
                  .then((data) => {
                    if (!data) {

                      const enduser = {
                        catID: req.body.catID,
                        end_username: req.body.first_name + " " + req.body.last_name,
                        end_phoneNo: req.body.end_phoneNo,
                        zipCode: req.body.zipCode,
                        gender: req.body.gender,
                        end_UserImage: req.file.location,
                        status: req.body.status,
                      };

                      var query = { _id: new Mongoose.Types.ObjectId(id) };
                      EndUser.findOneAndUpdate(query, enduser, {
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
                
                const enduser = {
                  catID: req.body.catID,
                  end_username: req.body.first_name + " " + req.body.last_name,
                  zipCode: req.body.zipCode,
                  gender: req.body.gender,
                  end_UserImage: req.file.location,
                  status: req.body.status,
                };

                var query = { _id: new Mongoose.Types.ObjectId(id) };
                EndUser.findOneAndUpdate(query, enduser, {
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

exports.findOneUser = (req, res) => {
  const token = req.header("auth-token");
  var decoded;
    decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);
    var userId = decoded.user._id;
  EndUser.findById(userId) //fineone or findByPK return object
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

exports.findOneUserParams = (req, res) => {
  const id = req.params.id;
  EndUser.findById(id) //fineone or findByPK return object
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

exports.delete = (req, res) => {
  const id = req.params.id;
  EndUser.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
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

exports.googleSignIn = async (req, res) => {
  try{
    const errors = validationResult(req); // Finds the validation errors
    var randomnumber = Math.random().toString(36).slice(-8);

        const catid = await Category.find()
          .where("catName")
          .equals("sellerorbuyer")
          .exec();

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } else {
            const enduser = {
              catID: catid[0]._id,
              googleID: req.body.profileId,
              end_username: req.body.fullName,
              end_email: req.body.email,
              end_UserImage: req.body.image,
              verifyCode: randomnumber,
              is_verified: 1,
              is_registered: 1,
              status: 1,
            };

            const user = await EndUser.findOne({end_email: req.body.email});
            if (!user) {
              const data = await EndUser.create(enduser);
              if (data) {
                  var arr =[];
                  var app = await app_notification(data._id);
                  var email = await email_notification(data._id);
                  var obj = {
                    userdata: data,
                    appNot: app,
                    emailnot: email,
                  };
                  arr.push(obj);
                const token = JsonWebToken.sign({ data }, config.SECRET_JWT_CODE, {
                  expiresIn: config.EXPIRES_IN,
                });
                const session = await Session.create({
                  endUserID: data._id,
                  token: token,
                });
                
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
                  to: data.end_email, //receiver email address
                  subject: NODEMAIL.MAIL_SUBJECT,
                  text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal \n\n\nKind Regards,\n Sleek Rides`,
                };
                transport.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.status(501).send({
                      message: error,
                    });
                  } else {
                    console.warn("Email has been sent", info.response);
                    Session.findOne({ token: token })
                    .then((sessions) => {
                      res.status(200).send({
                        message: "New Google user SignIn",
                        data: arr,
                        accessToken: sessions.token,
                      });
                    });
                  }
                });
              }
            } else {
              const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
                expiresIn: config.EXPIRES_IN,
              });
              const session = await Session.create({
                endUserID: user._id,
                token: token,
              });
              Session.findOne({ token: token }).then((sessions) => {
                res.status(200).send({
                  data: user,
                  accessToken: sessions.token,
                });
              });
            }
          }
  } catch(error){
    console.log(error)
  }
};

exports.facebookSignIn = async (req, res) => {
  try{
    const errors = validationResult(req); // Finds the validation errors
    var randomnumber = Math.random().toString(36).slice(-8);

        const catid = await Category.find()
          .where("catName")
          .equals("sellerorbuyer")
          .exec();

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } else {
            const enduser = {
              catID: catid[0]._id,
              facebookID: req.body.profileId,
              end_username: req.body.fullName,
              end_email: req.body.email,
              end_UserImage: req.body.image,
              verifyCode: randomnumber,
              is_verified: 1,
              is_registered: 1,
              status: 1,
            };

            const user = await EndUser.findOne({end_email: req.body.email});
            if (!user) {
              const data = await EndUser.create(enduser);
              if (data) {
                  var arr =[];
                  var app = await app_notification(data._id);
                  var email = await email_notification(data._id);
                  var obj = {
                    userdata: data,
                    appNot: app,
                    emailnot: email,
                  };
                  arr.push(obj);
                const token = JsonWebToken.sign({ data }, config.SECRET_JWT_CODE, {
                  expiresIn: config.EXPIRES_IN,
                });
                const session = await Session.create({
                  endUserID: data._id,
                  token: token,
                });
                
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
                  to: data.end_email, //receiver email address
                  subject: NODEMAIL.MAIL_SUBJECT,
                  text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal \n\n\nKind Regards,\n Sleek Rides`,
                };
                transport.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.status(501).send({
                      message: error,
                    });
                  } else {
                    console.warn("Email has been sent", info.response);
                    Session.findOne({ token: token })
                    .then((sessions) => {
                      res.status(200).send({
                        message: "New Google user SignIn",
                        data: arr,
                        accessToken: sessions.token,
                      });
                    });
                  }
                });
              }
            } else {
              const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
                expiresIn: config.EXPIRES_IN,
              });
              const session = await Session.create({
                endUserID: user._id,
                token: token,
              });
              Session.findOne({ token: token }).then((sessions) => {
                res.status(200).send({
                  data: user,
                  accessToken: sessions.token,
                });
              });
            }
          }
  } catch(error){
    console.log(error)
  }
};

exports.appleSignIn = async (req, res) => {
  try{
    const errors = validationResult(req); // Finds the validation errors
    var randomnumber = Math.random().toString(36).slice(-8);

        const catid = await Category.find()
          .where("catName")
          .equals("sellerorbuyer")
          .exec();

          if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          } else {
            const enduser = {
              catID: catid[0]._id,
              appleID: req.body.profileId,
              end_username: req.body.fullName,
              end_email: req.body.email,
              end_UserImage: req.body.image,
              verifyCode: randomnumber,
              is_verified: 1,
              is_registered: 1,
              status: 1,
            };

            const user = await EndUser.findOne({
              $or:[
              {end_email: req.body.email},
              {appleID: req.body.profileId}
              ]
            });
            if (!user) {
              const data = await EndUser.create(enduser);
              if (data) {
                  var arr =[];
                  var app = await app_notification(data._id);
                  var email = await email_notification(data._id);
                  var obj = {
                    userdata: data,
                    appNot: app,
                    emailnot: email,
                  };
                  arr.push(obj);
                const token = JsonWebToken.sign({ data }, config.SECRET_JWT_CODE, {
                  expiresIn: config.EXPIRES_IN,
                });
                const session = await Session.create({
                  endUserID: data._id,
                  token: token,
                });
                
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
                  to: data.end_email, //receiver email address
                  subject: NODEMAIL.MAIL_SUBJECT,
                  text: `Hello ${data.end_username} \n\n\nYou registered an account on Sleek Rides portal \n\n\nKind Regards,\n Sleek Rides`,
                };
                transport.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    res.status(501).send({
                      message: error,
                    });
                  } else {
                    console.warn("Email has been sent", info.response);
                    Session.findOne({ token: token })
                    .then((sessions) => {
                      res.status(200).send({
                        message: "New Apple user SignIn",
                        data: arr,
                        accessToken: sessions.token,
                      });
                    });
                  }
                });
              }
            } else {
              const token = JsonWebToken.sign({ user }, config.SECRET_JWT_CODE, {
                expiresIn: config.EXPIRES_IN,
              });
              const session = await Session.create({
                endUserID: user._id,
                token: token,
              });
              Session.findOne({ token: token }).then((sessions) => {
                res.status(200).send({
                  data: user,
                  accessToken: sessions.token,
                });
              });
            }
          }
  } catch(error){
    console.log(error)
  }
};

async function app_notification(enduserid) {
  console.log("in functio..............")
  const appNotification = {
    endUserID: enduserid,
    status: 1,
  };
  var data= await AppNotification.findOne({ endUserID: enduserid })
      if (!data) {
        AppNotification.create(appNotification)
          .then((data) => {
            return{
              message:"App Notification add successfully",
              status:200
            };
          })
          .catch((err) => {
            return{
              message: err.message || "Some error occurred while create the AppNotification",
              status:500
            };
          });
      } else {
        return{
          message: "Data Already Exist",
          status:400
        };
      }   
}

async function email_notification(enduserid) {

  const emailNotification = {
    endUserID: enduserid,
    status: 1,
  };
  var data= await EmailNotification.findOne({ endUserID: enduserid })
      if (!data) {
        EmailNotification.create(emailNotification)
          .then((data) => {
            return{
              message:"Email Notification add successfully",
              status:200
            };
          })
          .catch((err) => {
            return{
              message: err.message || "Some error occurred while create the AppNotification",
              status:500
            };
          });
      } else {
        return{
          message: "Data Already Exist",
          status:400
        };
      }   
}