import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from 'graphql-tag';
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
import typeDefs from './schema/';
import resolvers from './resolvers';

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
);

async function startServer() {
  try {
    await driver.getServerInfo();
    console.log('Connected to Neo4j');

    const server = new ApolloServer({ typeDefs, resolvers });

    await startStandaloneServer(server);
    const serverInfo = server.getServerInfo();
    console.log(`🚀 Server ready at ${serverInfo.url}`);
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}

startServer();
