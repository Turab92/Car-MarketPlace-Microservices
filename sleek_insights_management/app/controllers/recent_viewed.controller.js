const { RecentViewed } = require("../models/recent_viewed.model");
const Mongoose = require("mongoose");
const JsonWebToken = require("jsonwebtoken");
const config = require("../config/auth");
const axios = require('axios');
require('dotenv').config();

const LIVE_API_URL= `${process.env.PROTOCOL}://${process.env.LIVE}:${process.env.GATEWAYPORT}`;


exports.create = (req, res) => {
  const recent_viewed = {
    endUserID: req.body.endUserID,
    postID: req.body.postID,
    datetime: new Date().toLocaleString().replace(",","").replace(/:.. /," "),
    status: 1,
  };
  RecentViewed.findOne({ postID: req.body.postID,endUserID: req.body.endUserID })
  .then((data) => {
    if (!data) {
      RecentViewed.create(recent_viewed)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the RecentViewed",
        });
      });
    } else {
        RecentViewed.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(data._id)})
        .then((data) => {
          if (data) {
            RecentViewed.create(recent_viewed)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while create the RecentViewed",
                });
            });
          } else {
            res.status(500).send({
              message: `Cannot delete RecentViewed with id=${data._id}`,
            });
          }
        });
    }
  });
 
};



exports.findAll = async (req, res) => {
  var decoded;
  const token = req.header("auth-token");
  decoded = JsonWebToken.verify(token, config.SECRET_JWT_CODE);
  var userId = decoded.user._id;
  const { page = 1, limit = 5 } = req.query
  var data = await RecentViewed.find({endUserID:userId}).limit(limit * 1).skip((page - 1) * limit).sort({ created_at: -1 }) //findAll return array
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving RecentViewed",
          });
        } else {
          var arr =[];
          for(viewed of data){              
            const search = await axios.get(`${LIVE_API_URL}/api/vce/view/findPost/`+viewed.postID)
                if(search)
                {
                  obj={
                    endUserID: viewed.endUserID,
                    postID: viewed.postID,
                    datetime:viewed.datetime,
                    post:search.data
                  }
                  arr.push(obj)
                }
              }
              res.status(200).send(arr); 
        }
      
  };
  
exports.findOne = (req, res) => {
  const id = req.params.id;
  RecentViewed.where('endUserID').equals(id).sort({ createdAt: -1 }) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(500).send({
          message: "Error retrieving RecentViewed with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

