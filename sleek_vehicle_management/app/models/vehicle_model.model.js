const Mongoose = require("mongoose")
/**
 * Model Schema
 */
const ModelSchema = new Mongoose.Schema({
    modelName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique:true,
    },
    makerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Make'
    },
    modelDescription:{
        type: String,
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
ModelSchema.set('timestamps', true);

module.exports.Model = Mongoose.model("Model", ModelSchema);