const { BodyStyle } = require("../models/body_style.model");
const FetchUser = require("../middleware/FetchUser.js")
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createbodyStyle": {
      return [
        body("bodyStyleName", "Body Style is required").notEmpty(),
        body("bodyStyleDescription", "Body Style Description is required").notEmpty(),
      ];
    }
    case "updatebodyStyle": {
      return [
        body("bodyStyleName", "Body Style is required").notEmpty(),
        body("bodyStyleDescription", "Body Style Description is required").notEmpty(),
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
        message: "Body Style image can not be empty!",
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
        var bodyStyleLogo_path = baseURL + "/public/BodyStyleLogo/" + req.file.filename;

        const bodystyle = {
          bodyStyleName: req.body.bodyStyleName,
          bodyStyleDescription: req.body.bodyStyleDescription,
          bodyStyleLogo: bodyStyleLogo_path,
          status: 1,
          created_by: fetchUser._id,
        };

        BodyStyle.findOne({ bodyStyleName: req.body.bodyStyleName })
          .then((data) => {
            if (!data) {
              BodyStyle.create(bodystyle)
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Some error occurred while create the Body Style",
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
                err.message || "Some error occured while retrieving Body Style",
            });
          });
      }
    }
  }
};

exports.findAll = (req, res) => {
  BodyStyle.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Body Style",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  BodyStyle.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Body Style",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  BodyStyle.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Body Style with id=" + id,
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
      BodyStyle.findOneAndUpdate(query, req.body, { upsert: true }).then((data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Body Style was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Body Style with id=${id}`,
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
        var bodyStyleLogo_path = baseURL + "/public/BodyStyleLogo/" + req.file.filename;

        const bodystyle = {
          bodyStyleName: req.body.bodyStyleName,
          bodyStyleDescription: req.body.bodyStyleDescription,
          bodyStyleLogo: bodyStyleLogo_path,
          status: req.body.status,
        };

        var query = { _id: new Mongoose.Types.ObjectId(id) };
        BodyStyle.findOneAndUpdate(query, bodystyle, { upsert: true }).then((data) => {
          if (data[0] != 0) {
            res.status(200).send({
              message: "Body Style was updated successfully",
            });
          } else {
            res.status(500).send({
              message: `Cannot update Body Style with id=${id}`,
            });
          }
        });
      }
    }
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  BodyStyle.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "Body Style was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Body Style with id=${id}`,
        });
      }
    }
  );
};
