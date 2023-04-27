const { NewlistSubscription } = require("../models/newlist_subscription.model");
const Mongoose = require("mongoose");

exports.create = (req, res) => {
  const newlist_subscription = {
    endUserID: req.body.endUserID,
    endUserEmail: req.body.endUserEmail,
    status: 1,
  };
  NewlistSubscription.where('endUserEmail').equals(req.body.endUserEmail) //fineone or findByPK return object
  .then((data) => {
    if (!data.length) {
      NewlistSubscription.create(newlist_subscription)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the NewlistSubscription",
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
    NewlistSubscription.find() //findAll return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving NewlistSubscription",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  NewlistSubscription.where('endUserID').equals(id) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Error retrieving NewlistSubscription with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

