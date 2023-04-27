const { httpStatus } = require("../config/status");
const urls = require("../URLs");
const request = require("request");

module.exports = (req, res, next) => {
    var timeCheckedIn = new Date();
    map = req.useragent;

    if (map.isMobile === true) {
      request.post(
        //First parameter API to make post request
        urls.INSIGHTS_API_URL + "/clicks/interaction",
        headers = req.useragent,

        //Second parameter DATA which has to be sent to API
        {
          json: {
            userClicksIn: "Mobile",
            timeCheckedIn: timeCheckedIn,
          },
        },

        //Thrid parameter Callack function
        function (error) {
          if (error) {
            return console.log(error);
          }
          next();
        }
      );
    } else if(map.isDesktop === true) {
      request.post(
        //First parameter API to make post request
        urls.INSIGHTS_API_URL + "/clicks/interaction",

        //Second parameter DATA which has to be sent to API
        {
          json: {
            userClicksIn: "Desktop",
            timeCheckedIn: timeCheckedIn,
          },
        },

        //Thrid parameter Callack function
        function (error) {
          if (error) {
            return console.log(error);
          }
          next();
        }
      );
    }
    else {
      request.post(
        //First parameter API to make post request
        urls.INSIGHTS_API_URL + "/clicks/interaction",

        //Second parameter DATA which has to be sent to API
        {
          json: {
            userClicksIn: "Anonymous",
            timeCheckedIn: timeCheckedIn,
          },
        },

        //Thrid parameter Callack function
        function (error) {
          if (error) {
            return console.log(error);
          }
          next();
        }
      );
    }
};
