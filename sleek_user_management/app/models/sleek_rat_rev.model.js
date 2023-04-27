const Mongoose = require("mongoose")
/**
 * Category Permission Schema
 */
 const SleekRatRevSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser',
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    platform_type: {
        type: String,
        required: true,
    },
    topic_feature: {
        type: String,
        required: true,
    },
    reviews: {
        type: String,
        required: true,
    },
    dealerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser',
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
SleekRatRevSchema.set('timestamps', true);

module.exports.SleekRatRev = Mongoose.model("SleekRatRev", SleekRatRevSchema);