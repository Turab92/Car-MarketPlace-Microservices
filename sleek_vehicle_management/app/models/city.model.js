const Mongoose = require("mongoose")
/**
 * City Schema
 */
const CitySchema = new Mongoose.Schema({
    cityName: {
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
CitySchema.set('timestamps', true);

module.exports.City = Mongoose.model("City", CitySchema);