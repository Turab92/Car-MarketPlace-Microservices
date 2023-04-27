const Mongoose = require("mongoose")
/**
 * Transmission Schema
 */
const TransmissionSchema = new Mongoose.Schema({
    transmissionName: {
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
TransmissionSchema.set('timestamps', true);

module.exports.Transmission = Mongoose.model("Transmission", TransmissionSchema);