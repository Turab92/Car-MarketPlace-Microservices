const { createProxyMiddleware } = require('http-proxy-middleware');
const exception = require('./middlewares/Exception');
const authJwt = require("./middlewares/authJwt");
const timeCheckedIn = require("./middlewares/timeCheckedIn");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const useragent = require('express-useragent');
app.use(useragent.express());

const {
  USERS_API_URL,
  VEHICLES_API_URL,
  INSIGHTS_API_URL
} = require('./URLs');

const optionsUsers = {
  target: USERS_API_URL,
  secure: false,
  changeOrigin: true, 
  logger: console,
};
const usersProxy = createProxyMiddleware(optionsUsers);

const optionsVehicles = {
  target: VEHICLES_API_URL,
  secure: false,
  changeOrigin: true, 
  logger: console,
};
const vehiclesProxy = createProxyMiddleware(optionsVehicles);

const optionsInsights = {
  target: INSIGHTS_API_URL,
  secure: false,
  changeOrigin: true, 
  logger: console,
};
const insightsProxy = createProxyMiddleware(optionsInsights);

app.get("/", (req, res) => res.send("Hello Gateway!!!"));

//Web APIs
app.use("/clicks/", usersProxy);
app.use("/api/auth/", usersProxy);
app.use("/api/vce/view/", vehiclesProxy);


//Admin APIs
app.use("/api/usr/",[authJwt.verifyMainToken], usersProxy);
app.use("/api/vce/usr/",[authJwt.verifyMainToken], vehiclesProxy);

//EndUser APIs
app.use("/api/endusr/",[authJwt.verifyToken], usersProxy);
app.use("/api/vce/endusr/",[authJwt.verifyToken], vehiclesProxy);
app.use("/api/vce/newsfeed/", vehiclesProxy);
app.use("/api/ins/endusr/",[authJwt.verifyToken], insightsProxy);
app.use("/api/ins/internal/", insightsProxy);

//Exception Handlers Middleware
app.use(exception.handleValidationError);
app.use(exception.handleTypeError);
app.use(exception.handleDatabaseError);
app.use(exception.handleServerError);
app.use(exception.handleReferenceError);
app.use(exception.handleNotFoundError);

require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Gateway listening on http://localhost:${PORT}`);
});