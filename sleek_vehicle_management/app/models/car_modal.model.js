const Mongoose = require("mongoose")
/**
 * CarModal Schema
 */
const CarModalSchema = new Mongoose.Schema({
    CarModalName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique:true,
    },
    CarMakerID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'CarMaker'
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
CarModalSchema.set('timestamps', true);

module.exports.CarModal = Mongoose.model("CarModal", CarModalSchema);