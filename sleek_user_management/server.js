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
require('./app/routes/category.routes')(app);
require('./app/routes/end_user.routes')(app);
require('./app/routes/internal_user.routes')(app);
require('./app/routes/mainmenu.routes')(app);
require('./app/routes/password.routes')(app);
require('./app/routes/role_permission.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/session.routes')(app);
require('./app/routes/submenu.routes')(app);
require('./app/routes/app_notification.routes')(app);
require('./app/routes/email_notification.routes')(app);
require('./app/routes/sleek_rat_rev.routes')(app);

app.get("/", (req, res) => res.send("Hello User!!!"));

app.get("/clicks", async (req, res) =>{
  var timeCheckedIn = new Date()
  res.send({
    timeCheckedIn: timeCheckedIn,
  })
});

require('dotenv').config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`User Server listening on http://localhost:${PORT}`);
});