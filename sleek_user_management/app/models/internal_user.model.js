const Mongoose = require("mongoose")
/**
 * InternalUser Schema
 */
const InternalUserSchema = new Mongoose.Schema({
    roleID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    username:{
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        unique: true, 
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
    },
    phoneNo: {
        type: String,
        maxLength: 15,
    },
    zipCode:{
        type: Number, 
    },
    gender:{
        type: String,
    },
    userImage:{
        type: String,
    },
    verifyCode:{
        type: String,
    },
    is_verified: {
        type: Number,
        default:0
    },
    is_registered: {
        type: Number, 
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
InternalUserSchema.set('timestamps', true);

module.exports.InternalUser = Mongoose.model("InternalUser", InternalUserSchema);