import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// 1
const startServer = async () => {

  // 2
  const app = express()
  const httpServer = createServer(app)

  // 3
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // 4
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };

  // 5
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  // 6
  await apolloServer.start()

  // 7
  apolloServer.applyMiddleware({
      app,
      path: '/api'
  })

  // 8
  httpServer.listen({ port: process.env.PORT || 4000 }, ({ url }) =>
    console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev
    `)
  )
}

startServer()



