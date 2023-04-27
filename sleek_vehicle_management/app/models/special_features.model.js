const Mongoose = require("mongoose")
/**
 * Special Features Schema
 */
const SpecialFeaturesSchema = new Mongoose.Schema({
    specialFeaturesName: {
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
SpecialFeaturesSchema.set('timestamps', true);

module.exports.SpecialFeatures = Mongoose.model("SpecialFeatures", SpecialFeaturesSchema);