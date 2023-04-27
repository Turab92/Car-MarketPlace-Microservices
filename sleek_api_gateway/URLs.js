require('dotenv').config();

module.exports = {
    USERS_API_URL: `${process.env.PROTOCOL}://${process.env.HOST}:4001`,
    VEHICLES_API_URL: `${process.env.PROTOCOL}://${process.env.HOST}:4002`,
    INSIGHTS_API_URL: `${process.env.PROTOCOL}://${process.env.HOST}:4003`,
  };