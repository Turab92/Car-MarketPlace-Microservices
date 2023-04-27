const Mongoose = require("mongoose")
/**
 * Category Permission Schema
 */
 const CatPermissionSchema = new Mongoose.Schema({
    catID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    mainID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Mainmenu'
    },
    subID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Submenu'
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
CatPermissionSchema.set('timestamps', true);

module.exports.CatPermission = Mongoose.model("CatPermission", CatPermissionSchema);