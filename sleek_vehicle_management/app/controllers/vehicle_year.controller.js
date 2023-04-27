const { Year } = require("../models/vehicle_year.model");
const FetchUser = require("../middleware/FetchUser.js")
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createYear": {
      return [
        body("yearName", "Year is required").notEmpty(),
        body("yearName", "Year value must be in integer").isInt()
    ];
    }
    case "updateYear": {
      return [
        body("yearName", "Year is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors
  var fetchUser = await FetchUser.user(req.header("auth-token"));

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    const yearname = {
      yearName: req.body.yearName,
      status: 1,
      created_by: fetchUser._id,
    };

    Year.findOne({ yearName: req.body.yearName })
      .then((data) => {
        if (!data) {
            Year.create(yearname)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the Year",
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
            err.message || "Some error occured while retrieving Year",
        });
      });
  }
};

exports.findAll = (req, res) => {
    Year.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Year",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Year.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Year",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Year.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Year with id=" + id,
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
    Year.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Year was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Year with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Year.findOneAndDelete({
    _id: new Mongoose.Types.ObjectId(id),
  }).then((data) => {
    if (data) {
      res.status(200).send({
        message: "Year was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete Year with id=${id}`,
      });
    }
  });
};
