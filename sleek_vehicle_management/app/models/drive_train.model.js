const Mongoose = require("mongoose")
/**
 * Drive Train Schema
 */
const DriveTrainSchema = new Mongoose.Schema({
    driveTrainName: {
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
DriveTrainSchema.set('timestamps', true);

module.exports.DriveTrain = Mongoose.model("DriveTrain", DriveTrainSchema);