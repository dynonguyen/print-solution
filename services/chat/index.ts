// Set environment variables
import 'dotenv/config';
import 'reflect-metadata';

// Import third-party
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import to from 'await-to-js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { GraphQLSchema } from 'graphql';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import morgan from 'morgan';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';

// Import local file
import corsConfig from '~/config/cors';
import mongooseConnect from '~/config/database';
import logger from '~/config/logger';
import { MAX } from '~/constants/validation';
import authChecker from '~/middleware/authenticate';
import resolvers from '~/resolvers';
import getEnv from '~/utils/getEnv';

/*
  Subscriptions are not supported by Apollo Server 4's startStandaloneServer function. To enable subscriptions, you must first swap to using the expressMiddleware function.
*/
async function runServer() {
  // Connect mongodb
  const [dbError] = await to<boolean>(mongooseConnect());
  if (dbError) {
    logger.error('Connect mongodb error failed !', dbError);
    process.exit(-1);
  }

  const SERVER_PORT = Number(getEnv('PORT') || 3002);
  const app = express();

  // GraphQL building
  const [buildError, graphqlSchema] = await to<GraphQLSchema>(
    buildSchema({
      resolvers: resolvers,
      dateScalarMode: 'isoDate',
      authChecker,
      validate: { forbidUnknownValues: false }
    })
  );

  if (buildError || !graphqlSchema) {
    logger.error('Build graphql schema failed !', buildError);
    process.exit(-1);
  }

  // HTTP, Socket server for Subscription
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
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
  app.use(expressMiddleware(apolloServer, { context: async ({ req, res }) => ({ req, res }) }));

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: SERVER_PORT }, resolve));
  logger.info(`🚀 CHAT SERVICE IS LISTENING ON ${SERVER_PORT}`);
}

runServer();
