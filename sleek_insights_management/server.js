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
require('./app/routes/interaction_summary.routes')(app);
require('./app/routes/dealer_interaction.routes')(app);
require('./app/routes/newlist_subscription.routes')(app);
require('./app/routes/check_availability.routes')(app);
require('./app/routes/recent_search.routes')(app);
require('./app/routes/wishlist.routes')(app);
require('./app/routes/recent_viewed.routes')(app);
require('./app/routes/saved_search.routes')(app);

app.get("/", (req, res) => res.send("Hello Insights!!!"));

require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Insights Server listening on http://localhost:${PORT}`);
});