const Mongoose = require("mongoose")
/**
 * Post Special Features Type Schema
 */
const PostSpecialFeaturesSchema = new Mongoose.Schema({
    postListingId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'PostListing'
    },
    specialFeaturesTypeId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'SpecialFeaturesType'
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
PostSpecialFeaturesSchema.set('timestamps', true);

module.exports.PostSpecialFeatures = Mongoose.model("PostSpecialFeatures", PostSpecialFeaturesSchema);