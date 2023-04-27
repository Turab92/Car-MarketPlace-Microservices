const Mongoose = require("mongoose");
const { Submenu } = require("../models/submenu.model");
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSubmenu": {
      return [
        body("mainID", "Mainmenu ID is required").notEmpty(),
        body("subTitle", "Submenu title is required").notEmpty(),
        body("subLink", "Submenu link is required").notEmpty(),
        body("subpanelType", "subpanelType is required").notEmpty(),
        body("subSequence", "Submenu sequence is required").notEmpty(),
        body("subSequence","Submenu sequence value must be in integer").isInt(),
      ];
    }
    case "updateSubmenu": {
      return [
        body("mainID", "Mainmenu ID is required").notEmpty(),
        body("subTitle", "Submenu title is required").notEmpty(),
        body("subLink", "Submenu link is required").notEmpty(),
        body("subpanelType", "subpanelType is required").notEmpty(),
        body("subSequence", "Submenu sequence is required").notEmpty(),
        body("subSequence","Submenu sequence value must be in integer").isInt(),
        body("status", "Status is required").notEmpty(),
        body("status", "Status value must be in integer").isInt(),
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
    const submenu = {
      mainID: req.body.mainID,
      subTitle: req.body.subTitle,
      subLink: req.body.subLink,
      subpanelType: req.body.subpanelType,
      subSequence: req.body.subSequence,
      status: 1,
    };

    Submenu.create(submenu)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the Submenu",
        });
      });
  }
};

exports.findAll = (req, res) => {
  Submenu.find().populate("mainID") //findAll return array
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Some error occured while retrieving Submenu",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Submenu.findById(id) //fineone or findById return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving Submenu with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findMain = (req, res) => {
  const mainid = req.params.id;
  Submenu.find().where("mainID").equals(mainid) //findMain return array
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Some error occured while retrieving Submenu",
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
    Submenu.findOneAndUpdate(query, req.body, { upsert: true })
    .then((data) => {
      if (!data.length) {
        res.status(200).send({
          message: "Submenu was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Submenu with id=${id}`,
        });
      }
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Submenu.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
  .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Submenu was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Submenu with id=${id}`,
        });
      }
    }
  );
};