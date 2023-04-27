const { CarMaker } = require("../models/car_makers.model");

const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCar_makers": {
      return [body("CarMakerName", "CarMaker is required").notEmpty()];
    }
    case "updateCar_makers": {
      return [
        body("CarMakerName", "CarMaker is required").notEmpty(),
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
    const car_makers = {
      CarMakerName: req.body.CarMakerName,
      status: 1,
      created_by: req.body.created_by,
    };

    CarMaker.findOne({ CarMakerName: req.body.CarMakerName })
      .then((data) => {
        if (!data) {
          CarMaker.create(car_makers)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the CarMaker",
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
            err.message || "Some error occured while retrieving CarMaker",
        });
      });
  }
};

exports.findAll = (req, res) => {
  CarMaker.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving CarMaker",
        });
      } else {
        res.status(200).send(data);
      }
    });
};



exports.findOne = (req, res) => {
  const id = req.params.id;
  CarMaker.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving CarMaker with id=" + id,
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
    CarMaker.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "CarMaker was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update CarMaker with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  CarMaker.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "CarMaker was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete CarMaker with id=${id}`,
        });
      }
    }
  );
};
