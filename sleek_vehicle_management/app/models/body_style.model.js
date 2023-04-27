const Mongoose = require("mongoose")
/**
 * Body Style Schema
 */
const BodyStyleSchema = new Mongoose.Schema({
    bodyStyleName: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique:true,
    },
    bodyStyleDescription:{
        type: String,
    },
    bodyStyleLogo:{
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
BodyStyleSchema.set('timestamps', true);

module.exports.BodyStyle = Mongoose.model("BodyStyle", BodyStyleSchema);