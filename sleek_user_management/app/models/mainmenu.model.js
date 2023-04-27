const Mongoose = require("mongoose")
/**
 * Main Menu Schema
 */
const MainMenuSchema = new Mongoose.Schema({
    mainTitle:{
        type: String,
    },
    mainLink: {
        type: String,
    },
    panelType: {
        type: String, 
    },
    mainSequence: {
        type: Number,
    },
    status: {
        type: Number, 
    },
});

//below line will automatically generate createdAt & updatedAt fields
MainMenuSchema.set('timestamps', true);

module.exports.Mainmenu = Mongoose.model("Mainmenu", MainMenuSchema);