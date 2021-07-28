const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const config = require("config");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const CheckConfig = require("./startup/config");

CheckConfig();

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubSub })
});

mongoose
  .connect(config.get("DB_URI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => server.listen({ port: config.get("PORT") }))
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
