import fs from 'fs-extra';

import { IDBMeta } from 'server/types/db';

import { DB_META_PATH, DB_PATH } from 'server/db/constants';

interface IMigration {
  version: number;
  forward(): Promise<void>;
  backward(): Promise<void>;
}

const INITIAL_META: IDBMeta = {
  version: 1,
};

async function getMeta() {
  let meta = null;

  try {
    meta = await fs.readJSON(DB_META_PATH);
  } catch (err) {
    meta = INITIAL_META;

    await fs.writeJSON(DB_META_PATH, meta);
  }

  return meta;
}

const MIGRATIONS: IMigration[] = [
  {
    version: 2,
    async forward() {
      const db = await fs.readJSON(DB_PATH);

      db.rooms.forEach((room: any) => {
        room.costHistoryItems = [];
        room.transactionHistoryItems = [];
      });

      await fs.writeJSON(DB_PATH, db);
    },
    async backward() {
      const db = await fs.readJSON(DB_PATH);

      db.rooms.forEach((room: any) => {
        delete room.costHistoryItems;
        delete room.transactionHistoryItems;
      });

      await fs.writeJSON(DB_PATH, db);
    },
  },
];

(async () => {
  const meta = await getMeta();

  for (const migration of MIGRATIONS) {
    if (migration.version <= meta.version) {
      continue;
    }

    await migration.forward();

    await fs.writeJSON(DB_META_PATH, {
      ...meta,
      version: migration.version,
    });

    console.log(`DB migrated to version: ${migration.version}`);
  }
})();
