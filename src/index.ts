import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 1
const startServer = async () => {

  // 2
  const app = express()
  const httpServer = createServer(app)

  // 3
  const typeDefs = gql`
    type Query {
      users: [User]
    }

    type User {
      id: ID!
      name: String!
      email: String
    }
  `;

  // 4
  const resolvers = {
    Query: {
      boards: () => {
        return prisma.user.findMany()
      }
    },
  };

  const main = async () => {
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: 'A',
        },
      },
    })
  
    console.log('Top users (alphabetical): ', users)
  }
  
  main()
    .catch((e) => console.error('Error in Prisma Client query: ', e))
    .finally(async () => await prisma.$disconnect())

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
  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`
      🚀  Server is ready on port ${process.env.PORT}
      📭  Query at https://studio.apollographql.com/dev
    `)
  )
}

startServer()



