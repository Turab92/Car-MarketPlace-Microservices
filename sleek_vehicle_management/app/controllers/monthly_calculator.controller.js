const { MonthlyCalculator } = require("../models/monthly_calculator.model");
const Mongoose = require("mongoose");
const FetchUser = require("../middleware/FetchUser.js")

const { body, validationResult } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createMonthlyCalculator": {
      return [
        body("interest_rate", " interest_rate is required").notEmpty(),
        body("month_duration", " month_duration is required").notEmpty(),
        body("down_payment", " down_payment is required").notEmpty(),
        body("down_payment_type", " down_payment_type is required").notEmpty()
      ];
    }
    case "updateMonthlyCalculator": {
      return [
        body("interest_rate", " interest_rate is required").notEmpty(),
        body("month_duration", " month_duration is required").notEmpty(),
        body("down_payment", " down_payment is required").notEmpty(),
        body("down_payment_type", " down_payment_type is required").notEmpty()
      ];
    }
  }
};

exports.create = async (req, res) => {
  const errors = validationResult(req); // Finds the validation errors

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  } else {
    const token = req.header("auth-token");
    var fetchUser = await FetchUser.user(token);
    var year =req.body.month_duration/12;
    console.log(year)
    const monthlyCalculator = {
      endUserId: fetchUser._id,
      interest_rate: req.body.interest_rate,
      month_duration: req.body.month_duration,
      year_duration: year,
      down_payment: req.body.down_payment,
      down_payment_type: req.body.down_payment_type,
      status: 1,
    };

    MonthlyCalculator.findOne({ endUserId: fetchUser._id })
      .then((data) => {
        if (!data) {
          MonthlyCalculator.create(monthlyCalculator)
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message ||
                  "Some error occurred while create the MonthlyCalculator",
              });
            });
        } else {
            const monthlyCalculator = {
                interest_rate: req.body.interest_rate,
                month_duration: req.body.month_duration,
                year_duration: year,
                down_payment: req.body.down_payment,
                down_payment_type: req.body.down_payment_type,
              };
            var query = { _id: new Mongoose.Types.ObjectId(data._id) };
            MonthlyCalculator.findOneAndUpdate(query, monthlyCalculator, { upsert: true }).then(
              (data) => {
                if (data[0] != 0) {
                  res.status(200).send({
                    message: "MonthlyCalculator was updated successfully",
                  });
                } else {
                  res.status(500).send({
                    message: `Cannot update MonthlyCalculator with id=${id}`,
                  });
                }
              }
            )
        }
      })
      .catch((err) => {
        res.status(502).send({
          message:
            err.message || "Some error occured while retrieving MonthlyCalculator",
        });
      });
  }
};

exports.findAll = (req, res) => {
  MonthlyCalculator.find() //findAll return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving MonthlyCalculator",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findActive = (req, res) => {
  MonthlyCalculator.find()
    .where("status")
    .equals(1) //findActive return array
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Some error occured while retrieving MonthlyCalculator",
        });
      } else {
        res.status(200).send(data);
      }
    });
};

exports.findOne = async (req, res) => {
    const token = req.header("auth-token");
    var fetchUser = await FetchUser.user(token);
  MonthlyCalculator.findOne({endUserId: fetchUser._id}) //fineone or findByPK return object
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: "Error retrieving MonthlyCalculator with id=" + fetchUser._id,
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
    MonthlyCalculator.findOneAndUpdate(query, req.body, { upsert: true }).then(
      (data) => {
        if (data[0] != 0) {
          res.status(200).send({
            message: "MonthlyCalculator was updated successfully",
          });
        } else {
          res.status(500).send({
            message: `Cannot update MonthlyCalculator with id=${id}`,
          });
        }
      }
    );
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  MonthlyCalculator.findOneAndDelete({ _id: new Mongoose.Types.ObjectId(id) }).then(
    (data) => {
      if (data) {
        res.status(200).send({
          message: "MonthlyCalculator was delete successfully!",
        });
      } else {
        res.status(500).send({
          message: `Cannot delete MonthlyCalculator with id=${id}`,
        });
      }
    }
  );
};

exports.monthlycalculation = async (req, res) => {
  try {
    var p,r,n,t;
   
    var divide =(r/n);
    var power =n*t;
    var step1 = p*divide
    var step2 = 1-(1+divide^-power)

    var final = step1/step2
    
      
        
        res.status(200).send(final);
    
    
  } catch (error) {
    console.error(error);
    // throw error
  }

}; 