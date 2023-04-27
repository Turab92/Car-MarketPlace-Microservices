const Mongoose = require("mongoose")
/**
 * Category Schema
 */
 const CategorySchema = new Mongoose.Schema({
    catName:{
        type: String,
        required: true,
        lowercase: true,
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
CategorySchema.set('timestamps', true);

module.exports.Category = Mongoose.model("Category", CategorySchema);