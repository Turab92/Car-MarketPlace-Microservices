const { City } = require("../models/city.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCity": {
      return [body("cityName", "City Name is required").notEmpty()];
    }
    case "updateCity": {
      return [
        body("cityName", "City Name is required").notEmpty(),
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
    const city = {
      cityName: req.body.cityName,
      status: 1,
      created_by: req.body.created_by,
    };

    City.findOne({ cityName: req.body.cityName })
      .then((data) => {
        if (!data) {
            City.create(city)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the City Name",
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
            err.message || "Some error occured while retrieving City Name",
        });
      });
  }
};

exports.findAll = (req, res) => {
    City.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving City Name",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    City.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving City Name",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  City.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving City Name with id=" + id,
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
    City.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "City Name was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update City Name with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  City.findOneAndDelete({
    _id: new Mongoose.Types.ObjectId(id),
  }).then((data) => {
    if (data) {
      res.status(200).send({
        message: "City Name was delete successfully!",
      });
    } else {
      res.status(500).send({
        message: `Cannot delete City Name with id=${id}`,
      });
    }
  });
};
