const Mongoose = require("mongoose")
/**
 * Vehicle Color Schema
 */
const ColorSchema = new Mongoose.Schema({
    colorName: {
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
ColorSchema.set('timestamps', true);

module.exports.Color = Mongoose.model("Color", ColorSchema);