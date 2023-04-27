const { Category } = require("../models/category.model");
const Mongoose = require("mongoose")

exports.create = (req, res) => {
  if (!req.body.catName) {
    res.status(400).send({
      message: "Category must be filled out!" ,
    });
    return;
  }
  const category = {
    catName: req.body.catName,
    status: 1,
  };

  Category.findOne({ catName: req.body.catName })
    .then((data) => {
      if (!data) {
        Category.create(category)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Category",
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
        message: err.message || "Some error occured while retrieving Category",
      });
    });
};

exports.findAll = (req, res) => {
  Category.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Category",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Category.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Category",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Category.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Category with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    
    if (!req.body.catName) {
      res.status(400).send({
        message: "Category must be filled out!",
      });
      return;
    }
    var query = { _id: new Mongoose.Types.ObjectId(id)};
    Category.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "Category was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Category with id=${id}`,
        });
      }
    });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Category.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Category was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Category with id=${id}`,
        });
      }
    });
  };