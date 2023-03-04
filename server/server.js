import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http'

import { typeDefs, resolvers } from './src/schema.js'

const startAplloServer = async (typeDefs, resolvers) => {
    const app = express()

    const httpServer = http.createServer(app)

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start()

    server.applyMiddleware({ app })

    await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve))

    console.log(`SERVER IS READY! by http://localhost:4001${server.graphqlPath}`)
}

startAplloServer(typeDefs, resolvers)