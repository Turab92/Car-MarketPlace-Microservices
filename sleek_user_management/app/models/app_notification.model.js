const Mongoose = require("mongoose")
/**
 * Category Permission Schema
 */
 const AppNotificationSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser',
        unique: true,
        required: true,
    },
    price_drop: {
        type: Boolean,
        default:false,
    },
    new_listing: {
        type: Boolean,
        default:false,
    },
    recent_search: {
        type: Boolean,
        default:false,
    },
    offers: {
        type: Boolean,
        default:false,
    },
    messages: {
        type: Boolean,
        default:false,
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
AppNotificationSchema.set('timestamps', true);

module.exports.AppNotification = Mongoose.model("AppNotification", AppNotificationSchema);