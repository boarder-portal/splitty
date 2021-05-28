import express from 'express';
import redis from 'redis';
import connectRedis from 'connect-redis';
import expressSession from 'express-session';
import morgan from 'morgan';

import render from 'server/middlewares/render';

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
  .use(morgan(':method :url :status :response-time ms :date[iso]'))
  .get('*', render);

app.listen(2525, () => console.log('\nListening on port 2525...'));
