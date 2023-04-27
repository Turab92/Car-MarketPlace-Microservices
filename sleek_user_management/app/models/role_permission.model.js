const Mongoose = require("mongoose")
/**
 * Role Permission Schema
 */
 const RolePermissionSchema = new Mongoose.Schema({
    roleID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Role'
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
RolePermissionSchema.set('timestamps', true);

module.exports.RolePermission = Mongoose.model("RolePermission", RolePermissionSchema);