const { PostSpecialFeatures } = require("../models/post_special_features.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createPostSpecialFeatures": {
      return [
        body("postListingId", "postListingId is required").notEmpty(),
        body("specialFeaturesTypeId", "specialFeaturesTypeId is required").notEmpty()
    ];
    }
    case "updatePostSpecialFeatures": {
      return [
        body("postListingId", "postListingId is required").notEmpty(),
        body("specialFeaturesTypeId", "specialFeaturesTypeId is required").notEmpty(),
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
    const postSpecialFeatures = {
      postListingId: req.body.postListingId,
      specialFeaturesTypeId: req.body.specialFeaturesTypeId,
      status: 1,
      created_by: req.body.created_by,
    };

    PostSpecialFeatures.find({ postListingId: req.body.postListingId,specialFeaturesTypeId: req.body.specialFeaturesTypeId })
      .then((data) => {
        if (!data.length) {
          PostSpecialFeatures.create(postSpecialFeatures)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the PostSpecialFeatures",
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
            err.message || "Some error occured while retrieving PostSpecialFeatures",
        });
      });
  }
};

exports.findAll = (req, res) => {
  PostSpecialFeatures.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving PostSpecialFeatures",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  PostSpecialFeatures.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving PostSpecialFeatures",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  PostSpecialFeatures.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving PostSpecialFeatures with id=" + id,
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
    PostSpecialFeatures.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "PostSpecialFeatures was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update PostSpecialFeatures with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  PostSpecialFeatures.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "PostSpecialFeatures was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete PostSpecialFeatures with id=${id}`,
        });
      }
    }
  );
};
