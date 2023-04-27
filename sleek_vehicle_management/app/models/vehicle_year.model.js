const Mongoose = require("mongoose")
/**
 * Year Schema
 */
const YearSchema = new Mongoose.Schema({
    yearName: {
        type: Number,
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
YearSchema.set('timestamps', true);

module.exports.Year = Mongoose.model("Year", YearSchema);