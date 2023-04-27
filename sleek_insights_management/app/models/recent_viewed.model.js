const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const RecentViewedSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    postID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
RecentViewedSchema.set('timestamps', true);

module.exports.RecentViewed = Mongoose.model("RecentViewed", RecentViewedSchema);