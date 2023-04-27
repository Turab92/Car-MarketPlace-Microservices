const Mongoose = require("mongoose")
/**
 * Trim Schema
 */
const TrimSchema = new Mongoose.Schema({
    trimName: {
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
TrimSchema.set('timestamps', true);

module.exports.Trim = Mongoose.model("Trim", TrimSchema);