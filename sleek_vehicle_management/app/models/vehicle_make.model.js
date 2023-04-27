const Mongoose = require("mongoose")
/**
 * Make Schema
 */
 const MakeSchema = new Mongoose.Schema({
    makeName:{
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique:true,
    },
    makeDescription:{
        type: String,
    },
    makeLogo:{
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
MakeSchema.set('timestamps', true);

module.exports.Make = Mongoose.model("Make", MakeSchema);