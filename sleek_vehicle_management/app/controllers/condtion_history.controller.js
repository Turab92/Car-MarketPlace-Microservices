const { CondtionHistory } = require("../models/condition_history.model");
const { CondtionHistoryType } = require("../models/condition_history_type.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createCondtionHistory": {
      return [body("CondtionHistoryName", "CondtionHistory is required").notEmpty()];
    }
    case "updateCondtionHistory": {
      return [
        body("CondtionHistoryName", "CondtionHistory is required").notEmpty(),
        body("status", "status is required").notEmpty(),
        body("status", "status value must be in integer").isInt(),
      ];
    }
  }
};

exports.create = (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    const condtionHistory = {
      CondtionHistoryName: req.body.CondtionHistoryName,
      status: 1,
      created_by: req.body.created_by,
    };

    CondtionHistory.findOne({ CondtionHistoryName: req.body.CondtionHistoryName })
      .then((data) => {
        if (!data) {
          CondtionHistory.create(condtionHistory)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the CondtionHistory",
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
          message:
            err.message || "Some error occured while retrieving CondtionHistory",
        });
      });
  }
};

exports.findAll = (req, res) => {
  CondtionHistory.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving CondtionHistory",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = async (req, res) => {
 var arrmain=[];
 var data = await CondtionHistory.find()
    .where("status")
    .equals(1) //findActive return array
  
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving CondtionHistory",
        });
      } else {
        for (var main of data) {
            console.log(main)
           var sub = await CondtionHistoryType.find({status:1,CondtionHistoryId:main._id})
              if (!sub) {
                res.status(500).send({
                  message: "Some error occured while retrieving CondtionHistoryType",
                });
              } else {
                var arrsub=[];
                for (var subdata of sub) {
                    var objsub = {
                        CondtionHistoryId: subdata.CondtionHistoryId,
                        CondtionHistoryTypeID: subdata._id,
                        CondtionHistoryTypeName: subdata.CondtionHistoryTypeName,
                        
                      };
                      arrsub.push(objsub);
                }
                
                var objmain = {
                    CondtionHistoryId: main._id,
                    CondtionHistoryName: main.CondtionHistoryName,
                    subdata:arrsub
                  };
                  arrmain.push(objmain);
              }
          
        }
        res.status(200).send(arrmain);
        
      }

};

exports.findOne = (req, res) => {
  const id = req.params.id;
  CondtionHistory.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving CondtionHistory with id=" + id,
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    var query = { _id: new Mongoose.Types.ObjectId(id) };
    CondtionHistory.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "CondtionHistory was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update CondtionHistory with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  CondtionHistory.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "CondtionHistory was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete CondtionHistory with id=${id}`,
        });
      }
    }
  );
};
