const Mongoose = require("mongoose")

/**
 * InternalUser Session Schema
 */
 const InSessionSchema = new Mongoose.Schema({
    userID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'InternalUser'
    },
    token: {
        type: String,
    },
    blacklist: {
        type: Number, 
        default: 0,
    },
});

//below line will automatically generate createdAt & updatedAt fields
InSessionSchema.set('timestamps', true);

module.exports.InternalUserSession = Mongoose.model("InternalUserSession", InSessionSchema);


/**
 * EndUser Session Schema
 */
 const EndUserSessionSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser'
    },
    token: {
        type: String,
    },
    blacklist: {
        type: Number, 
        default: 0,
    },
});

//below line will automatically generate createdAt & updatedAt fields
EndUserSessionSchema.set('timestamps', true);

module.exports.EndUserSession = Mongoose.model("EndUserSession", EndUserSessionSchema);