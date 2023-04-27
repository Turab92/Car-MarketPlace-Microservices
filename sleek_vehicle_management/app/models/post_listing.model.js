const Mongoose = require("mongoose")
/**
 * Post Listing Schema
 */
const PostListingSchema = new Mongoose.Schema({
    endUserId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser'
    },
    regCityId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    licensePlate: {
        type: String,
    },
    VIN: {
        type: String,
    },
    cityId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    year: {
        type: String,
    },
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    listingTitle:{
        type: String, 
        maxLength: 20
    },
    overview:{
        type: String,  
        maxLength: 200
    },
    exteriorColorId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    transmissionId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Transmission'
    },
    mileage:{
        type: String,
    },
    price:{
        type: Number,
    },
    interiorColorId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    trim:{
        type: String,
    },
    driveTrainId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'DriveTrain'
    },
    doors: {
        type: Number,
        min: 1,
        max: 5
    },
    engineSize: {
        type: String,
    },
    sellOrTrade: {
        type: String,
    },
    accidents: {
        type: String,
    },
    is_drivable: {
        type: String,
    },
    is_modification: {
        type: String,
    },
    is_smokedIn: {
        type: String,
    },
    vehicleKeys: {
        type: String,
    },
    vehicleCondition: {
        type: String,
    },
    is_pending: {
        type: Boolean,
        default:true,
    },
    is_approved: {
        type: Boolean,
        default:false,
    },
    is_rejected: {
        type: Boolean,
        default:false,
    },
    reason: {
        type: String,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
PostListingSchema.set('timestamps', true);

module.exports.PostListing = Mongoose.model("PostListing", PostListingSchema);