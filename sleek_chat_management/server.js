const { PubSub, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const typeDefs = require("./app/typeDefs");
const resolvers = require("./app/resolvers");

dotenv.config();

const DB_URL = process.env.DB_URL;
console.log(DB_URL)
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("-----> mongoDB connected..."))
  .catch((err) =>
    console.log("-----> Error trying to connect to mongoDB: ", err)
  );

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
mongoose.connection.once("open", () =>
  server.start(() => console.log("We make magic over at localhost:4000"))
);
