const mongoose = require('mongoose');
const moment = require('moment');

/**
 * User Schema
 */
const User = mongoose.model("User", {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  }
});

/**
 * Message Schema
 */

const Message = mongoose.model("Message", {
  message: String,
  senderMail: String,
  receiverMail: String,
  timestamp: {
    type: String, 
    default: moment().format('YYYY-MM-DDTHH:mm:ss')
  }
});

module.exports = { User, Message };