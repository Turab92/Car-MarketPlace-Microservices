const { DriveTrain } = require("../models/drive_train.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createDriveTrain": {
      return [body("driveTrainName", "Drive Train is required").notEmpty()];
    }
    case "updateDriveTrain": {
      return [
        body("driveTrainName", "Drive Train is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    const drive_train = {
      driveTrainName: req.body.driveTrainName,
      status: 1,
      created_by: req.body.created_by,
    };

    DriveTrain.findOne({ driveTrainName: req.body.driveTrainName })
      .then((data) => {
        if (!data) {
          DriveTrain.create(drive_train)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the Drive Train",
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
            err.message || "Some error occured while retrieving Drive Train",
        });
      });
  }
};

exports.findAll = (req, res) => {
  DriveTrain.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Drive Train",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  DriveTrain.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Drive Train",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  DriveTrain.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Drive Train with id=" + id,
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
    var query = { _id: new Mongoose.Types.ObjectId(id) };
    DriveTrain.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Drive Train was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Drive Train with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  DriveTrain.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "Drive Train was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Drive Train with id=${id}`,
        });
      }
    }
  );
};
