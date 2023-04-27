const { SleekRatRev } = require("../models/sleek_rat_rev.model");
const Mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "create_rating_reviews": {
      return [
        body("endUserID", "endUserID is required").notEmpty(),
        body("rating", "rating is required").notEmpty(),
        body("platform_type", "platform_type is required").notEmpty(),
        body("topic_feature", "topic_feature is required").notEmpty(),
        body("reviews", "reviews is required").notEmpty()
    ];
    }
    case "update_rating_reviews": {
      return [
        body("endUserID", "endUserID is required").notEmpty(),
        body("rating", "rating is required").notEmpty(),
        body("platform_type", "platform_type is required").notEmpty(),
        body("topic_feature", "topic_feature is required").notEmpty(),
        body("reviews", "reviews is required").notEmpty()
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
    const rat_rev = {
      endUserID: req.body.endUserID,
      rating: req.body.rating,
      platform_type: req.body.platform_type,
      topic_feature: req.body.topic_feature,
      reviews: req.body.reviews,
      dealerID: req.body.dealerID,
      status: 1,
    };

    // SleekRatRev.findOne({ SleekRatRevName: req.body.SleekRatRevName })
    //   .then((data) => {
    //     if (!data) {
          SleekRatRev.create(rat_rev)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the SleekRatRev",
              });
            });
        // } else {
        //   res.status(400).send({
        //     message: "Data Already Exist",
        //   });
        // }
    //   })
    //   .catch((err) => {
    //     res.status(502).send({
    //       message:
    //         err.message || "Some error occured while retrieving SleekRatRev",
    //     });
    //   });
  }
};

exports.findAll = (req, res) => {
  SleekRatRev.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving SleekRatRev",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findByPlatform = (req, res) => {
    var query;
    if(req.body.platform_type === "Dealer feedback")
    {
        query = { platform_type: req.body.platform_type,
                   endUserID :  req.body.dealerID
        }
    }
    else{
        query = { platform_type: req.body.platform_type}
    }
    SleekRatRev
    // .aggregate(
    //      [
    //         {
    //            $group:
    //            {
      
    //               "_id":"_id",
    //               AverageValue: { $avg: "$rating" }
    //            }
    //         }
    //      ]
    //   )
    .find(query) //findAll return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving SleekRatRev",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;
  SleekRatRev.findById(id) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving SleekRatRev with id=" + id,
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
    SleekRatRev.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "SleekRatRev was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update SleekRatRev with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  SleekRatRev.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "SleekRatRev was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete SleekRatRev with id=${id}`,
        });
      }
    }
  );
};
