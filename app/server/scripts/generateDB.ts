import fs from 'fs-extra';

import { DB_PATH } from 'server/db/constants';

(async () => {
  await fs.ensureFile(DB_PATH);
  await fs.writeJSON(DB_PATH, {
    rooms: [],
  });
})();
