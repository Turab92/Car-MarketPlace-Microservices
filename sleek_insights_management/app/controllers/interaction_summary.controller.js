const InteractionSummary = require("../models/interaction_summary.model").InteractionSummary;

exports.create = (req, res) => {
  const interactionsummary = {
    userClicksIn: req.body.userClicksIn,
    timeCheckedIn: req.body.timeCheckedIn,
    status: 1,
  };

  InteractionSummary.create(interactionsummary)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while create the Interaction Summary",
      });
    });
};

