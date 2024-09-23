import neo4j from 'neo4j-driver';
import * as dotenv from 'dotenv';
dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
);

const resolvers = {
  Query: {
    tracks: async () => {
      const session = driver.session();
      try {
        const result = await session.run('MATCH (t:Track) RETURN t');
        return result.records.map(record => record.get('t').properties);
      } catch (error) {
        console.error('Error fetching tracks:', error);
        throw new Error('Failed to fetch tracks');
      } finally {
        await session.close();
      }
    },
  },
};

export default resolvers;
