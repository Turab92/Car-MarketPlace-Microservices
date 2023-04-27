const { EmailNotification } = require("../models/email_notification.model");
const Mongoose = require("mongoose")

exports.create = (req, res) => {
  if (!req.body.endUserID) {
    res.status(400).send({
      message: "EmailNotification must be filled out!" ,
    });
    return;
  }
  const emailNotification = {
    endUserID: req.body.endUserID,
    price_drop: req.body.price_drop,
    new_listing: req.body.new_listing,
    recent_search: req.body.recent_search,
    offers: req.body.offers,
    messages: req.body.messages,
    status: 1,
  };

  EmailNotification.findOne({ endUserID: req.body.endUserID })
    .then((data) => {
      if (!data) {
        EmailNotification.create(emailNotification)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the EmailNotification",
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
        message: err.message || "Some error occured while retrieving EmailNotification",
      });
    });
};

exports.findAll = (req, res) => {
  EmailNotification.find() //findAll return array
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Some error occured while retrieving EmailNotification",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    EmailNotification.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving EmailNotification",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const endUserID = req.params.endUserID;
    EmailNotification.findOne({ endUserID: endUserID}) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving EmailNotification with endUserID=" + endUserID,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const endUserID = req.params.endUserID;
    
    if (!req.params.endUserID) {
      res.status(400).send({
        message: "EmailNotification must be filled out!",
      });
      return;
    }
    var query = { endUserID: new Mongoose.Types.ObjectId(endUserID)};
    EmailNotification.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "EmailNotification was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update EmailNotification with endUserID=${endUserID}`,
        });
      }
    });
  };

  exports.delete = (req, res) => {
    const endUserID = req.params.endUserID;
    EmailNotification.findOneAndDelete({ endUserID: new Mongoose.Types.ObjectId(endUserID)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "EmailNotification was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete EmailNotification with endUserID=${endUserID}`,
        });
      }
    });
  };