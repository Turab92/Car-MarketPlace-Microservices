const Mongoose = require("mongoose")
/**
 * Interaction Summary Schema
 */
const WishlistSchema = new Mongoose.Schema({
    endUserID: {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
    },
    postID: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
WishlistSchema.set('timestamps', true);

module.exports.Wishlist = Mongoose.model("Wishlist", WishlistSchema);