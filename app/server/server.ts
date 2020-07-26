import path from 'path';
import express from 'express';
import redis from 'redis';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from 'server/graphql/schema';
import resolvers from 'server/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    session: req.session,
  }),
});

const app = express();

const SESSION_ALIVE_TIME_MS = 3 * 30 * 24 * 60 * 60 * 1000;

const redisStore = connectRedis(expressSession);
const redisClient = redis.createClient();

app
  .use(expressSession({
    secret: 'secrettttt',
    cookie: {
      maxAge: SESSION_ALIVE_TIME_MS,
    },
    store: new redisStore({
      client: redisClient,
      prefix: 'splitty',
    }),
  }))
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(morgan('dev'))
  .use(express.static('build'))
  .use(express.static('public'))
  .get('*', (req, res) => {
    res.render('index', { rooms: req.session?.rooms || [] });
  });

server.applyMiddleware({ app });

app.listen(2525, () => console.log('\nListening on port 2525...'));
