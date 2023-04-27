const { Model } = require("../models/vehicle_model.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createModel": {
      return [
        body("modelName", " Model Name is required").notEmpty(),
        body("modelDescription", " Model Description is required").notEmpty(),
      ];
    }
    case "updateModel": {
      return [
        body("modelName", " Model Name is required").notEmpty(),
        body("modelDescription", " Model Description is required").notEmpty(),
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
    const vehicle_model = {
      modelName: req.body.modelName,
      makerID: req.body.makerid,
      modelDescription: req.body.modelDescription,
      status: 1,
      created_by: req.body.created_by,
    };

    Model.findOne({ modelName: req.body.modelName })
      .then((data) => {
        if (!data) {
          Model.create(vehicle_model)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the Model",
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
            err.message || "Some error occured while retrieving Model",
        });
      });
  }
};

exports.findAll = (req, res) => {
  Model.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Model",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  Model.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Model",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findMakerModel = (req, res) => {
  Model.find({status:1,makerID: req.params.makerid})
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Model",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Model.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Model with id=" + id,
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
    Model.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "Model was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Model with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Model.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "Model was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Model with id=${id}`,
        });
      }
    }
  );
};