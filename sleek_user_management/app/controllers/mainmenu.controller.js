const { Mainmenu } = require("../models/mainmenu.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMainmenu": {
      return [
        body("mainTitle", "MainMenu Name is required").notEmpty(),
        body("mainSequence", "Menu sequence is required").notEmpty(),
      ];
    }
    case "updateMainmenu": {
      return [
        body("mainTitle", "MainMenu Name is required").notEmpty(),
        body("mainSequence", "Menu sequence is required").notEmpty(),
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
    const mainmenu = {
      mainTitle: req.body.mainTitle,
      mainLink: req.body.mainLink,
      panelType: req.body.panelType,
      mainSequence: req.body.mainSequence,
      status: 1,
    };

    Mainmenu.create(mainmenu)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the Mainmenu",
        });
      });
  }
};

exports.findAll = (req, res) => {
    Mainmenu.find() //findAll return array
    .then((data) => {
    if (!data.length) {
      res.status(500).send({
        message: "Data Not Found",
      });
    } else {
      res.status(200).send(data);
    }
  });
};
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  Mainmenu.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Sorry! Data Not Found With Id=" + id,
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
    Mainmenu.findOneAndUpdate(query, req.body, { upsert: true })
    .then((data) => {
        if (!data.length) {
          res.status(200).send({
            message: "Mainmenu was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update Mainmenu with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Mainmenu.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
  .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Mainmenu was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Mainmenu with id=${id}`,
        });
      }
    }
  );
};
  