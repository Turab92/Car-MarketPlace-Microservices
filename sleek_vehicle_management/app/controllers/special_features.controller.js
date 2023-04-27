const { SpecialFeatures } = require("../models/special_features.model");
const { SpecialFeaturesType } = require("../models/special_features_type.model");
const Mongoose = require("mongoose");

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createSpecialFeatures": {
      return [body("specialFeaturesName", "SpecialFeatures is required").notEmpty()];
    }
    case "updateSpecialFeatures": {
      return [
        body("specialFeaturesName", "SpecialFeatures is required").notEmpty(),
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
    const specialFeatures = {
      specialFeaturesName: req.body.specialFeaturesName,
      status: 1,
      created_by: req.body.created_by,
    };

    SpecialFeatures.findOne({ specialFeaturesName: req.body.specialFeaturesName })
      .then((data) => {
        if (!data) {
          SpecialFeatures.create(specialFeatures)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the SpecialFeatures",
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
            err.message || "Some error occured while retrieving SpecialFeatures",
        });
      });
  }
};

exports.findAll = (req, res) => {
  SpecialFeatures.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving SpecialFeatures",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = async (req, res) => {
 var arrmain=[];
 var data = await SpecialFeatures.find()
    .where("status")
    .equals(1) //findActive return array
  
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving SpecialFeatures",
        });
      } else {
        for (var main of data) {
            console.log(main)
           var sub = await SpecialFeaturesType.find({status:1,specialFeaturesId:main._id})
              if (!sub) {
                res.status(500).send({
                  message: "Some error occured while retrieving SpecialFeaturesType",
                });
              } else {
                var arrsub=[];
                for (var subdata of sub) {
                    console.log(subdata)
                    var objsub = {
                        specialFeaturesId: subdata.specialFeaturesId,
                        specialFeatureTypeID: subdata._id,
                        specialFeaturesTypeName: subdata.specialFeaturesTypeName,
                        
                      };
                      arrsub.push(objsub);
                }
                
                var objmain = {
                    specialFeatureID: main._id,
                    specialFeaturesName: main.specialFeaturesName,
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
  SpecialFeatures.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving SpecialFeatures with id=" + id,
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
    SpecialFeatures.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "SpecialFeatures was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update SpecialFeatures with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  SpecialFeatures.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "SpecialFeatures was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete SpecialFeatures with id=${id}`,
        });
      }
    }
  );
};


exports.findByName = async (req, res) => {
  var data = await SpecialFeatures.findOne({status:1, specialFeaturesName:req.params.sf_name})
       if (!data) {
         res.status(500).send({
           message: "Some error occured while retrieving SpecialFeatures",
         });
       } else {
            var sub = await SpecialFeaturesType.find({status:1,specialFeaturesId:data._id})
               if (!sub) {
                 res.status(500).send({
                   message: "Some error occured while retrieving SpecialFeaturesType",
                 });
               } else {
                 
                res.status(200).send(sub);
              
               }
 
       }
 
 };