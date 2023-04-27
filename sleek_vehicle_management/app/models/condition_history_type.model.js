const Mongoose = require("mongoose")
/**
 * Special Features Type Schema
 */
const CondtionHistoryTypeSchema = new Mongoose.Schema({
    CondtionHistoryId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'CondtionHistory'
    },
    CondtionHistoryTypeName: {
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
CondtionHistoryTypeSchema.set('timestamps', true);

module.exports.CondtionHistoryType = Mongoose.model("CondtionHistoryType", CondtionHistoryTypeSchema);