const mongoose = require("mongoose");
const config = require("./auth");

mongoose.set("strictQuery", true);
mongoose.connect(config.URL+config.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("-----> mongoDB connected..."))
    .catch((err) =>
        console.log("-----> Error trying to connect to mongoDB: ", err)
    );

mongoose.connection.on(
    "error",
    console.error.bind(console, "-----> mongoDB connection error")
);
