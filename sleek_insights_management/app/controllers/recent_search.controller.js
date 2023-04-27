const { RecentSearch } = require("../models/recent_search.model");
const Mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");

exports.create = (req, res) => {
  const recent_search = {
    endUserID: req.body.endUserID,
    search_keywords: req.body.search_keywords,
    NewOrUsed: req.body.NewOrUsed,
    maker: req.body.maker,
    modal: req.body.modal,
    city: req.body.city,
    status: 1,
  };
      RecentSearch.create(recent_search)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the RecentSearch",
        });
      });
    
 
};

exports.findAll = (req, res) => {
  var decoded;
  const token = req.header("auth-token");
  decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);
  var userId = decoded.user._id;
    RecentSearch.find({endUserID:userId}).sort({ created_at: -1 }) //findAll return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving RecentSearch",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  RecentSearch.where('endUserID').equals(id).sort({ createdAt: -1 }) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Error retrieving RecentSearch with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

