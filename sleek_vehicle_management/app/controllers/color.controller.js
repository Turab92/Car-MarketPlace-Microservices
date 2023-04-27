const { Color } = require("../models/color.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createColor": {
      return [body("colorName", "Color Name is required").notEmpty()];
    }
    case "updateColor": {
      return [
        body("colorName", "Color Name is required").notEmpty(),
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
    const color = {
      colorName: req.body.colorName,
      status: 1,
      created_by: req.body.created_by,
    };

    Color.findOne({ colorName: req.body.colorName })
      .then((data) => {
        if (!data) {
          Color.create(color)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the Color Name",
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
            err.message || "Some error occured while retrieving Color Name",
        });
      });
  }
};

exports.findAll = (req, res) => {
  Color.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Color Name",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  Color.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Color Name",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Color.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Color Name with id=" + id,
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
    Color.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Color Name was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Color Name with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Color.findOneAndDelete({
    _id: new Mongoose.Types.ObjectId(id),
  }).then((data) => {
    if (data) {
      res.status(200).send({
        message: "Color Name was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete Color Name with id=${id}`,
      });
    }
  });
};
