const { CondtionHistoryType } = require("../models/condition_history_type.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCondtionHistoryType": {
      return [body("CondtionHistoryTypeName", "CondtionHistoryType is required").notEmpty()];
    }
    case "updateCondtionHistoryType": {
      return [
        body("CondtionHistoryTypeName", "CondtionHistoryType is required").notEmpty(),
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
    const condtionHistoryType = {
      CondtionHistoryId: req.body.CondtionHistoryId,
      CondtionHistoryTypeName: req.body.CondtionHistoryTypeName,
      status: 1,
      created_by: req.body.created_by,
    };

    CondtionHistoryType.find()
        .where("CondtionHistoryTypeName")
        .equals(req.body.CondtionHistoryTypeName) 
      .then((data) => {
        console.log(data)
        if (!data.length) {
          CondtionHistoryType.create(condtionHistoryType)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the CondtionHistoryType",
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
            err.message || "Some error occured while retrieving CondtionHistoryType",
        });
      });
  }
};

exports.findAll = (req, res) => {
  CondtionHistoryType.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving CondtionHistoryType",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  CondtionHistoryType.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving CondtionHistoryType",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  CondtionHistoryType.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving CondtionHistoryType with id=" + id,
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
    CondtionHistoryType.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "CondtionHistoryType was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update CondtionHistoryType with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  CondtionHistoryType.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "CondtionHistoryType was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete CondtionHistoryType with id=${id}`,
        });
      }
    }
  );
};
