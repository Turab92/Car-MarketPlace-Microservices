const Mongoose = require("mongoose")
/**
 * Special Features Type Schema
 */
const SpecialFeaturesTypeSchema = new Mongoose.Schema({
    specialFeaturesId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'SpecialFeatures'
    },
    specialFeaturesTypeName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique:true,
    },
    status: {
        type: Number,
    },
    created_by: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'InternalUser'
    },
});

//below line will automatically generate createdAt & updatedAt fields
SpecialFeaturesTypeSchema.set('timestamps', true);

module.exports.SpecialFeaturesType = Mongoose.model("SpecialFeaturesType", SpecialFeaturesTypeSchema);