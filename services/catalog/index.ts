// Set environment variables
import 'dotenv/config';
import 'reflect-metadata';

// Import third-party
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import morgan from 'morgan';
import { buildSchema } from 'type-graphql';
import { WebSocketServer } from 'ws';

// Import local file
import corsConfig from '~/config/cors';
import resolvers from '~/resolvers';
import getEnv from '~/utils/getEnv';

// Run server
(async function runServer() {
  const app = express();
  const SERVER_PORT = Number(getEnv('PORT') || 3002);

  // Setup logger
  const isDevMode = getEnv('NODE_ENV') !== 'production';

  if (!isDevMode) {
    app.disable('x-powered-by');
    app.use(morgan('common'));
  } else {
    app.use(morgan('dev'));
  }

  // Config express server
  app.use(cookieParser());

  // GraphQL building
  const graphqlSchema = await buildSchema({
    resolvers: resolvers,
    dateScalarMode: 'isoDate'
  });

  // HTTP, Socket server
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql'
  });
  const serverCleanup = useServer({ schema: graphqlSchema }, wsServer);

  // Apollo server
  const apolloServer = new ApolloServer({
    schema: graphqlSchema,
    context: ({ req, res }) => ({ req, res }),
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
  apolloServer.applyMiddleware({ app, cors: corsConfig });

  // Listening
  httpServer.listen(SERVER_PORT, () =>
    console.log(`CATALOG SERVICE IS LISTENING ON PORT ${SERVER_PORT} WITH GRAPHQL PATH ${apolloServer.graphqlPath}}`)
  );
})();
