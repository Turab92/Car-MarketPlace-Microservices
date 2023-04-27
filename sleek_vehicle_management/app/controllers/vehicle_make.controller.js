const { Make } = require("../models/vehicle_make.model");
const FetchUser = require("../middleware/FetchUser.js")
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMake": {
      return [
        body("makeName", "Make Name is required").notEmpty(),
        body("makeDescription", "Make Description is required").notEmpty(),
    ];
    }
    case "updateMake": {
      return [
        body("makeName", "Make Name is required").notEmpty(),
        body("makeDescription", "Make Description is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  var baseURL = req.protocol + "://" + req.get("Host")
  var fetchUser = await FetchUser.user(req.header("auth-token"));

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    if (req.file == undefined) {
      res.status(400).send({
        message: "Make image can not be empty!",
      });
      return;
    } else {
      if (
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/jpeg"
      ) {
        res.status(400).send({
          message: "You can Only Upload Images!!",
        });
      } else {
        var makeLogo_path = baseURL + "/public/MakeLogo/" + req.file.filename;

        const vehicle_make = {
          makeName: req.body.makeName,
          makeDescription: req.body.makeDescription,
          makeLogo: makeLogo_path,
          status: 1,
          created_by: fetchUser._id,
        };

        Make.findOne({ makeName: req.body.makeName })
          .then((data) => {
            if (!data) {
              Make.create(vehicle_make)
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while create the Make",
                  });
                });
            } else {
              res.status(400).send({
                message: "Data Already Exist",
              });
            }
          })
          .catch((err) => {
            res.status(502).send({
              message:
                err.message || "Some error occured while retrieving Make",
            });
          });
      }
    }
  }
};

exports.findAll = (req, res) => {
  Make.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Make",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  Make.find() //findActive return array
    .where("status")
    .equals(1)
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Make",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Make.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Make with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req); // Finds the validation errors
  var baseURL = req.protocol + "://" + req.get("Host")

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    if (req.file == undefined) {
      var query = { _id: new Mongoose.Types.ObjectId(id) };
      Make.findOneAndUpdate(query, req.body, { upsert: true }).then((data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Make was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Make with id=${id}`,
          });
        }
      });
    } else {
      if (
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/jpeg"
      ) {
        res.status(400).send({
          message: "You can Only Upload Images!!",
        });
      } else {
        var makeLogo_path = baseURL + "/public/MakeLogo/" + req.file.filename;

        const vehicle_make = {
          makeName: req.body.makeName,
          makeDescription: req.body.makeDescription,
          makeLogo: makeLogo_path,
          status: req.body.status,
        };

        var query = { _id: new Mongoose.Types.ObjectId(id) };
        Make.findOneAndUpdate(query, vehicle_make, { upsert: true }).then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Make was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Make with id=${id}`,
            });
          }
        });
      }
    }
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Make.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "Make was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Make with id=${id}`,
        });
      }
    }
  );
};
