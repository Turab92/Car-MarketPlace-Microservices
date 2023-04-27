const Mongoose = require("mongoose");
/**
 * EndUser schema
 */
const EndUserSchema = new Mongoose.Schema({
  catID: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  googleID: {
    type: String,
  },
  facebookID: {
    type: String,
  },
  appleID: {
    type: String,
  },
  end_username: {
    type: String,
    required: true,
    minLength: 3,
  },
  end_email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  end_password: {
    type: String,
  },
  end_phoneNo: {
    type: String,
    maxLength: 15,
  },
  zipCode: {
    type: Number,
  },
  gender: {
    type: String,
  },
  end_UserImage: {
    type: String,
  },
  verifyCode: {
    type: String,
  },
  is_verified: {
    type: Number,
    default: 0,
  },
  is_registered: {
    type: Number,
  },
  status: {
    type: Number,
  },
});

//below line will automatically generate createdAt & updatedAt fields
EndUserSchema.set("timestamps", true);

module.exports.EndUser = Mongoose.model("EndUser", EndUserSchema);