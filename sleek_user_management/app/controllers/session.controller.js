const { InternalUserSession } = require("../models/session.model");

exports.findAllInternal = (req, res) => {
  const accessToken = req.body.token;
  InternalUserSession.find() //findAll return array
    .where("token").equals(accessToken)
    .where("blacklist").equals(0)
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving InternalUser Session",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

const { EndUserSession } = require("../models/session.model");

exports.findAllEndUser = (req, res) => {
  const accessToken = req.body.token;
  EndUserSession.find() //findAll return array
    .where("token").equals(accessToken)
    .where("blacklist").equals(0)
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving EndUser Session",
        });
      } else {
        res.status(200).send(data);
      }
    });
};