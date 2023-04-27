const { AppNotification } = require("../models/app_notification.model");
const Mongoose = require("mongoose")

exports.create = (req, res) => {
  if (!req.body.endUserID) {
    res.status(400).send({
      message: "AppNotification must be filled out!" ,
    });
    return;
  }
  const appNotification = {
    endUserID: req.body.endUserID,
    price_drop: req.body.price_drop,
    new_listing: req.body.new_listing,
    recent_search: req.body.recent_search,
    offers: req.body.offers,
    messages: req.body.messages,
    status: 1,
  };

  AppNotification.findOne({ endUserID: req.body.endUserID })
    .then((data) => {
      if (!data) {
        AppNotification.create(appNotification)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the AppNotification",
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
        message: err.message || "Some error occured while retrieving AppNotification",
      });
    });
};

exports.findAll = (req, res) => {
  AppNotification.find() //findAll return array
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Some error occured while retrieving AppNotification",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    AppNotification.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving AppNotification",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const endUserID = req.params.endUserID;
    AppNotification.findOne({ endUserID: endUserID }) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving AppNotification with endUserID=" + endUserID,
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
        message: "AppNotification must be filled out!",
      });
      return;
    }
    var query = { endUserID: new Mongoose.Types.ObjectId(endUserID)};
    AppNotification.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "AppNotification was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update AppNotification with endUserID=${endUserID}`,
        });
      }
    });
  };

  exports.delete = (req, res) => {
    const endUserID = req.params.endUserID;
    AppNotification.findOneAndDelete({ endUserID: new Mongoose.Types.ObjectId(endUserID)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "AppNotification was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete AppNotification with endUserID=${endUserID}`,
        });
      }
    });
  };