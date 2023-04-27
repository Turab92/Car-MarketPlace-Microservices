const { Role } = require("../models/role.model");
const Mongoose = require("mongoose")

exports.create = (req, res) => {
  if (!req.body.roleName) {
    res.status(400).send({
      message: "Role must be filled out!" ,
    });
    return;
  }
  const role = {
    roleName: req.body.roleName,
    status: 1,
  };

  Role.findOne({ roleName: req.body.roleName })
    .then((data) => {
      if (!data) {
        Role.create(role)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while create the Role",
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
        message: err.message || "Some error occured while retrieving Role",
      });
    });
};

exports.findAll = (req, res) => {
    Role.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving Role",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
    Role.find().where('status').equals(1) //findActive return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving Role",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Role.findById(id) //fineone or findByPK return object
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Error retrieving Role with id=" + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
    if (!req.body.roleName) {
      res.status(400).send({
        message: "Role must be filled out!",
      });
      return;
    }
    var query = { _id: new Mongoose.Types.ObjectId(id)};
    Role.findOneAndUpdate(query,req.body,{ upsert: true })
      .then((data) => {
      if (data[0] != 0) {
        res.status(200).send({
          message: "Role was updated successfully",
        });
      } else {
        res.status(500).send({
          message: `Cannot update Role with id=${id}`,
        });
      }
    });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Role.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id)})
    .then((data) => {
      if (data) {
        res.status(200).send({
          message: "Role was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Role with id=${id}`,
        });
      }
    });
  };
  