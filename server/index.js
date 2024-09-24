import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
dotenv.config()
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';


const driver = neo4j.driver(
    process.env.NEO4J_URI,
    neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({
    typeDefs,
    resolvers,
    driver,
    debug: true,
    features: {
        authorization: {
            key: {
                url: `https://${process.env.JWKS_ENDPOINT}/.well-known/jwks.json`
            },
        },
    },
});


neoSchema.getSchema().then(async (schema) => {
    try {
        const server = new ApolloServer({
            schema
        });

        const { url } = await startStandaloneServer(server, {
            context: async ({ req }) => ({
                token: req.headers.authorization,
                driver
            }),

            listen:  { port: 4000 },
        });

        console.log(`🚀 Server ready at ${url}`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
}).catch(err => console.error("Error in getting schema:", err));