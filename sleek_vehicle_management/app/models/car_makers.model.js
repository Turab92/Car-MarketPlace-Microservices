const Mongoose = require("mongoose")
/**
 * CarMaker Schema
 */
const CarMakerSchema = new Mongoose.Schema({
    CarMakerName: {
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
CarMakerSchema.set('timestamps', true);

module.exports.CarMaker = Mongoose.model("CarMaker", CarMakerSchema);