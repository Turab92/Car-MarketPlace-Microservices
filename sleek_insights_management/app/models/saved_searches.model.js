const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const SavedSearchSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    search_keywords: {
        type: String,
    },
    distance: {
        type: String,
    },
    makerORmodel: {
        type: String,
    },
    city: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    price_start: {
        type: Number,
    },
    price_end: {
        type: Number,
    },
    year_start: {
        type: String,
    },
    year_end: {
        type: String,
    },
    transmissionId: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    sf_bodytypeID: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    sf_origintypeID: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    max_mileage: {
        type: Number,
    },
    interiorColorId: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    exteriorColorId: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    condition: {
        type: String,
    },
    door: {
        type: Number,
    },
    sf_fueltypeID: {
        type: Mongoose.Schema.Types.ObjectId,
    },
    drivetrain: {
        type: String,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
SavedSearchSchema.set('timestamps', true);

module.exports.SavedSearch = Mongoose.model("SavedSearch", SavedSearchSchema);