const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const RecentSearchSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    search_keywords: {
        type: String,
        required: true,
    },
    NewOrUsed: {
        type: String,
        required: true,
    },
    maker: {
        type: String,
        required: true,
    },
    modal: {
        type: String,
        required: true,
    },
    city: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
RecentSearchSchema.set('timestamps', true);

module.exports.RecentSearch = Mongoose.model("RecentSearch", RecentSearchSchema);