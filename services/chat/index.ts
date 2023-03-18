// Set environment variables
import 'dotenv/config';
import 'reflect-metadata';

// Import third-party
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import morgan from 'morgan';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';

// Import local file
import corsConfig from '~/config/cors';
import logger from '~/config/logger';
import { MAX } from '~/constants/validation';
import resolvers from '~/resolvers';
import getEnv from '~/utils/getEnv';

// Run apollo server integrate with express server to use Subscription
/*
  Subscriptions are not supported by Apollo Server 4's startStandaloneServer function. To enable subscriptions, you must first swap to using the expressMiddleware function.
*/
(async function runServer() {
  const SERVER_PORT = Number(getEnv('PORT') || 3002);
  const app = express();

  // GraphQL building
  const graphqlSchema = await buildSchema({
    resolvers: resolvers,
    dateScalarMode: 'isoDate'
  });

  // HTTP, Socket server for Subscription
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer });
  const serverCleanup = useServer({ schema: graphqlSchema }, wsServer);

  // Apollo server
  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            }
          };
        }
      }
    ]
  });

  await apolloServer.start();

  // Setup express server
  if (getEnv('NODE_ENV') === 'production') app.use(morgan('common'));
  else app.use(morgan('dev'));

  app.use(express.json({ limit: MAX.SIZE_JSON_REQUEST }));
  app.use(express.urlencoded({ limit: MAX.SIZE_JSON_REQUEST, extended: true }));
  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(expressMiddleware(apolloServer));

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));
  logger.info(`🚀 CHAT SERVICE IS LISTENING ON ${SERVER_PORT}`);
})();
