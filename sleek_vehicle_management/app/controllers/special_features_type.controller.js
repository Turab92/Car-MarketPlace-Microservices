const { SpecialFeaturesType } = require("../models/special_features_type.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSpecialFeaturesType": {
      return [body("specialFeaturesTypeName", "SpecialFeaturesType is required").notEmpty()];
    }
    case "updateSpecialFeaturesType": {
      return [
        body("specialFeaturesTypeName", "SpecialFeaturesType is required").notEmpty(),
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
    const specialFeaturesType = {
      specialFeaturesId: req.body.specialFeaturesId,
      specialFeaturesTypeName: req.body.specialFeaturesTypeName,
      status: 1,
      created_by: req.body.created_by,
    };

    SpecialFeaturesType.find()
        .where("specialFeaturesTypeName")
        .equals(req.body.specialFeaturesTypeName) 
      .then((data) => {
        console.log(data)
        if (!data.length) {
          SpecialFeaturesType.create(specialFeaturesType)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the SpecialFeaturesType",
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
            err.message || "Some error occured while retrieving SpecialFeaturesType",
        });
      });
  }
};

exports.findAll = (req, res) => {
  SpecialFeaturesType.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving SpecialFeaturesType",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  SpecialFeaturesType.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving SpecialFeaturesType",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  SpecialFeaturesType.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving SpecialFeaturesType with id=" + id,
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
    SpecialFeaturesType.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "SpecialFeaturesType was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update SpecialFeaturesType with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  SpecialFeaturesType.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "SpecialFeaturesType was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete SpecialFeaturesType with id=${id}`,
        });
      }
    }
  );
};
