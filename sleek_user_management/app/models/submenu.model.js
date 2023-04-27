const Mongoose = require("mongoose")
/**
 * Sub Menu Schema
 */
const SubMenuSchema = new Mongoose.Schema({
    mainID: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Mainmenu'
    },
    subTitle:{
        type: String,
    },
    subLink: {
        type: String,
    },
    subpanelType: {
        type: String, 
    },
    subSequence: {
        type: Number,
    },
    status: {
        type: Number,
    },
});

//below line will automatically generate createdAt & updatedAt fields
SubMenuSchema.set('timestamps', true);

module.exports.Submenu = Mongoose.model("Submenu", SubMenuSchema);