const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const NewlistSubscriptionSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    endUserEmail: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
NewlistSubscriptionSchema.set('timestamps', true);

module.exports.NewlistSubscription = Mongoose.model("NewlistSubscription", NewlistSubscriptionSchema);