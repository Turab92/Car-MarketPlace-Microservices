const Mongoose = require("mongoose")
/**
 * Post Listing Images Schema
 */
const MonthlyCalculatorSchema = new Mongoose.Schema({
    endUserId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'EndUser',
        required:true
    },
    interest_rate: {
        type: Number,
        required:true
    },
    month_duration: {
        type: Number,
        required:true
    },
    year_duration: {
        type: Number,
        required:true
    },
    down_payment: {
        type: Number,
        required:true
    },
    down_payment_type: {
        type: String,
        required:true
    },
    status: {
        type: Number,
        required:true
    },
});

//below line will automatically generate createdAt & updatedAt fields
MonthlyCalculatorSchema.set('timestamps', true);

module.exports.MonthlyCalculator = Mongoose.model("MonthlyCalculator", MonthlyCalculatorSchema);