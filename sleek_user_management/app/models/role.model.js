const Mongoose = require("mongoose")
/**
 * Role Schema
 */
 const RoleSchema = new Mongoose.Schema({
    roleName:{
        type: String,
        required: true,
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
RoleSchema.set('timestamps', true);

module.exports.Role = Mongoose.model("Role", RoleSchema);