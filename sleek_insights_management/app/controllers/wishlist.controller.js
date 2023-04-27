const { Wishlist } = require("../models/wishlist.model");
const Mongoose = require("mongoose");
const axios = require('axios');
const config = require("../config/auth");

exports.create = (req, res) => {
  const wishlist = {
    endUserID: req.body.endUserID,
    postID: req.body.postID,
    status: 1,
  };
  Wishlist.findOne({ postID: req.body.postID,endUserID: req.body.endUserID })
  .then((data) => {
    if (!data) {
      Wishlist.create(wishlist)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while create the Wishlist",
        });
      });
    } else {
        Wishlist.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(data._id)})
        .then((data) => {
          if (data) {
            res.status(203).send({
              message: "Wishlist was delete successfully!",
            });
          } else {
            res.status(500).send({
              message: `Cannot delete Wishlist with id=${data._id}`,
            });
          }
        });
    }
  });
 
};

exports.findAll = async (req, res) => {
  const id = req.params.enduserid;
    var data = await Wishlist.find({endUserID : id}) //findAll return array
        if (!data.length) {
          res.status(500).send({
            message: "Some error occured while retrieving Wishlist",
          });
        } else {
          var arr =[];
          for(wish of data){
          const search = await axios.get(`http://192.168.1.227:3007/api/vce/view/findPost/`+wish.postID)
              if(search)
              {
                obj={
                  endUserID: wish.endUserID,
                  postID: wish.postID,
                  post:search.data
                }
                arr.push(obj)
              }
            }
            res.status(200).send(arr);  
        }
    
  };
  
exports.findOne = async (req, res) => {
  Wishlist
  .where('endUserID').equals(req.params.enduserid)
  .where('postID').equals(req.params.postid) //fineone or findByPK return object
    .then((data) => {
      if (!data.length) {
        res.status(404).send({
          message: "Data not found",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

