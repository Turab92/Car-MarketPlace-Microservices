const Mongoose = require("mongoose")
/**
 * Post Listing Images Schema
 */
const PostListingImagesSchema = new Mongoose.Schema({
    postListingId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'PostListing'
    },
    fileName: {
        type: String,
    },
    filePath: {
        type: String,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
PostListingImagesSchema.set('timestamps', true);

module.exports.PostListingImages = Mongoose.model("PostListingImages", PostListingImagesSchema);