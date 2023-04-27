const Mongoose = require("mongoose")
/**
 * Special Features Schema
 */
const CondtionHistorySchema = new Mongoose.Schema({
    CondtionHistoryName: {
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
CondtionHistorySchema.set('timestamps', true);

module.exports.CondtionHistory = Mongoose.model("CondtionHistory", CondtionHistorySchema);