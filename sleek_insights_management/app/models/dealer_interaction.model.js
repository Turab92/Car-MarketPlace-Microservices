const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const DealerInteractionSchema = new Mongoose.Schema({
    viewerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "EndUser",
    },
    dealerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "EndUser",
    },
    interationType: {
        type: String,
      },
    interationTime: {
        type: Date,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
DealerInteractionSchema.set('timestamps', true);

module.exports.DealerInteraction = Mongoose.model("DealerInteraction", DealerInteractionSchema);