const { PostConditionHistory } = require("../models/post_condition_history.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createPostConditionHistory": {
      return [
        body("postListingId", "postListingId is required").notEmpty(),
        body("ConditionHistoryTypeId", "ConditionHistoryTypeId is required").notEmpty()
    ];
    }
    case "updatePostConditionHistory": {
      return [
        body("postListingId", "postListingId is required").notEmpty(),
        body("ConditionHistoryTypeId", "ConditionHistoryTypeId is required").notEmpty(),
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
    const postConditionHistory = {
      postListingId: req.body.postListingId,
      ConditionHistoryTypeId: req.body.ConditionHistoryTypeId,
      status: 1,
      created_by: req.body.created_by,
    };

    PostConditionHistory.find({ postListingId: req.body.postListingId,ConditionHistoryTypeId: req.body.ConditionHistoryTypeId })
      .then((data) => {
        if (!data.length) {
          PostConditionHistory.create(postConditionHistory)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the PostConditionHistory",
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
            err.message || "Some error occured while retrieving PostConditionHistory",
        });
      });
  }
};

exports.findAll = (req, res) => {
  PostConditionHistory.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving PostConditionHistory",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  PostConditionHistory.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving PostConditionHistory",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  PostConditionHistory.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving PostConditionHistory with id=" + id,
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
    PostConditionHistory.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "PostConditionHistory was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update PostConditionHistory with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  PostConditionHistory.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "PostConditionHistory was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete PostConditionHistory with id=${id}`,
        });
      }
    }
  );
};
