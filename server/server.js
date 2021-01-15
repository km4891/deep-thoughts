const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();

// create new Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// integrate Apollo with Express application middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log to test GQL API
    console.log(`use GraphQL at http://localhost"${PORT}${server.graphqlPath}`);
  });
});
