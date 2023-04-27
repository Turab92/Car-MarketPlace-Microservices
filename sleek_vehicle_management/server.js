const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');

//Database Connection
require('./app/config/MongoDbConnection');

//Declare our Express App
const app = express();

app.use(cookieParser());
app.use(express.static(__dirname + '/app'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, 'public')));

//routes
require('./app/routes/body_style.routes')(app);
require('./app/routes/city.routes')(app);
require('./app/routes/color.routes')(app);
require('./app/routes/drive_train.routes')(app);
require('./app/routes/post_listing.routes')(app);
require('./app/routes/post_condition_history.routes')(app);
require('./app/routes/post_special_features.routes')(app);
require('./app/routes/special_features_type.routes')(app);
require('./app/routes/special_features.routes')(app);
require('./app/routes/condtion_history.routes')(app);
require('./app/routes/condtion_history_type.routes')(app);
require('./app/routes/transmission.routes')(app);
require('./app/routes/trim.routes')(app);
require('./app/routes/vehicle_make.routes')(app);
require('./app/routes/vehicle_model.routes')(app);
require('./app/routes/vehicle_year.routes')(app);
require('./app/routes/car_maker.routes')(app);
require('./app/routes/car_modal.routes')(app);
require('./app/routes/monthly_calculator.routes')(app);

app.get("/", (req, res) => res.send("Hello Vehicles!!!"));

require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Vehicle Server listening on http://localhost:${PORT}`);
});