import { getDB, writeDB } from './app/server/graphql/resolvers';

(async () => {
  const db = await getDB();

  db.rooms = [];

  await writeDB(db);
})();
