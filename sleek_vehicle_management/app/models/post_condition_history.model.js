const Mongoose = require("mongoose")
/**
 * Post Special Features Type Schema
 */
const PostConditionHistorySchema = new Mongoose.Schema({
    postListingId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'PostListing'
    },
    ConditionHistoryTypeId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'CondtionHistoryType'
    },
    status: {
        type: Number,
    },
    created_by: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser'
    },
});

//below line will automatically generate createdAt & updatedAt fields
PostConditionHistorySchema.set('timestamps', true);

module.exports.PostConditionHistory = Mongoose.model("PostConditionHistory", PostConditionHistorySchema);