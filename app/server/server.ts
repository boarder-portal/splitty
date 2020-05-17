import path from 'path';
import express from 'express';
import morgan from 'morgan';
import { ApolloServer } from 'apollo-server';

import typeDefs from 'server/graphql/schema';
import resolvers from 'server/graphql/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => console.log(`🚀 Apollo server ready at ${url}`));

const app = express();

app
  .set('view engine', 'pug')
  .set('views', path.join(__dirname, 'views'))
  .use(morgan('dev'))
  .use(express.static('build'))
  .use(express.static('public'))
  .get('*', (req, res) => {
    res.render('index');
  });

app.listen(3000, () => console.log('\nListening on port 3000...'));
