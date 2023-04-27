const { SavedSearch } = require("../models/saved_searches.model");
const Mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");
const config = require("../config/auth");

exports.create = (req, res) => {
  const recent_search = {
    endUserID: req.body.endUserID,
    search_keywords: req.body.search_keywords,
    distance: req.body.distance,
    makerORmodel: req.body.makerORmodel,
    city: req.body.city,
    price_start: req.body.price_start,
    price_end: req.body.price_end,
    year_start: req.body.year_start,
    year_end: req.body.year_end,
    transmissionId: req.body.transmissionId,
    sf_bodytypeID: req.body.sf_bodytypeID,
    sf_origintypeID: req.body.sf_origintypeID,
    max_mileage: req.body.max_mileage,
    interiorColorId: req.body.interiorColorId,
    exteriorColorId: req.body.exteriorColorId,
    condition: req.body.condition,
    door: req.body.door,
    sf_fueltypeID: req.body.sf_fueltypeID,
    drivetrain: req.body.drivetrain,
    status: 1,
  };
      SavedSearch.create(recent_search)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the SavedSearch",
        });
      });
    
 
};

exports.findAll = (req, res) => {
  var decoded;
  const token = req.header("auth-token");
  decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);
  var userId = decoded.user._id;
    SavedSearch.find({endUserID:userId}).sort({ created_at: -1 }) //findAll return array
      .then((data) => {
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving SavedSearch",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  SavedSearch.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Error retrieving SavedSearch with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
      var query = { _id: new Mongoose.Types.ObjectId(id) };
      SavedSearch.findOneAndUpdate(query, req.body, { upsert: true })
      .then((data) => {
        if (!data.length) {
          res.status(200).send({
            message: "SavedSearch was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update SavedSearch with id=${id}`,
          });
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(501).send({
          message:
            err.message || "Some error occurred while create the SavedSearch",
        });
      });
    
  };
  
  exports.delete = (req, res) => {
    const id = req.params.id;
    SavedSearch.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) })
    .then((data) => {
        if (data) {
          res.status(200).send({
            message: "SavedSearch was delete successfully!",
          });
        } else {
          res.status(500).send({
            message: `Cannot delete SavedSearch with id=${id}`,
          });
        }
      }
    );
  };
