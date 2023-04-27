const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const CheckAvailabilitySchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    endUserEmail: {
        type: String,
        required: true,
    },
    endUserName: {
        type: String,
        required: true,
    },
    endUserPhone: {
        type: String,
        required: true,
    },
    endUserCity: {
        type: String,
        required: true,
    },
    endUserMessage: {
        type: String,
        required: true,
    },
    dealerID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    postID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
CheckAvailabilitySchema.set('timestamps', true);

module.exports.CheckAvailability = Mongoose.model("CheckAvailability", CheckAvailabilitySchema);