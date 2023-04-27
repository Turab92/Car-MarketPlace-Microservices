const { CheckAvailability } = require("../models/check_availability.model");
const Mongoose = require("mongoose");

exports.create = (req, res) => {
  const check_availability = {
    endUserID: req.body.endUserID,
    endUserEmail: req.body.endUserEmail,
    endUserName: req.body.endUserName,
    endUserPhone: req.body.endUserPhone,
    endUserCity: req.body.endUserCity,
    endUserMessage: req.body.endUserMessage,
    dealerID: req.body.dealerID,
    postID: req.body.postID,
    status: 1,
  };
  CheckAvailability.findOne({ postID: req.body.postID,endUserID: req.body.endUserID }) //fineone or findByPK return object
  .then((data) => {
    if (!data) {
      CheckAvailability.create(check_availability)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the CheckAvailability",
        });
      });
    } else {
      res.status(500).send({
        message: "Data already exist with this endUserEmail = " + req.body.endUserEmail,
      });
    }
  });
 
};

exports.findAll = (req, res) => {
    CheckAvailability.find() //findAll return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving CheckAvailability",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  CheckAvailability.where('endUserID').equals(id) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Error retrieving CheckAvailability with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

