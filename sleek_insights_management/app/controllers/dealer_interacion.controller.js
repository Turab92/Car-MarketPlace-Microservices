const DealerInteraction = require("../models/dealer_interaction.model").DealerInteraction;

exports.create = (req, res) => {
  const dealerInteraction = {
    viewerID: req.body.viewerID,
    dealerID: req.body.dealerID,
    interationType: req.body.interationType,
    interationTime: req.body.interationTime,
    status: 1,
  };

  DealerInteraction.create(dealerInteraction)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while create the DealerInteraction",
      });
    });
};

exports.findAll = (req, res) => {
    DealerInteraction.find() //findAll return array
      .then((data) => {
        if (!data) {
          res.status(500).send({
            message: "Some error occured while retrieving DealerInteraction",
          });
        } else {
          res.status(200).send(data);
        }
      });
  };
  
    exports.findOne = (req, res) => {
      const id = req.params.id;
      DealerInteraction.where('dealerID').equals(id) //fineone or findByPK return object
        .then((data) => {
          if (!data) {
            res.status(500).send({
              message: "Error retrieving DealerInteraction with id=" + id,
            });
          } else {
            res.status(200).send(data);
          }
        });
    };

