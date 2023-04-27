const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const InteractionSummarySchema = new Mongoose.Schema({
    userClicksIn: {
        type: String,
        required: true,
    },
    timeCheckedIn: {
        type: Date,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
InteractionSummarySchema.set('timestamps', true);

module.exports.InteractionSummary = Mongoose.model("InteractionSummary", InteractionSummarySchema);