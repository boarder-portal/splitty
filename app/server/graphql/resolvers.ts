import path from 'path';
import fs from 'fs-extra';
import uuid from 'uuid/v4';

import { IRoom } from 'common/types/room';
import { IAddRoomCostParams, IAddRoomTransactionParams, ICreateRoomParams } from 'common/types/requestParams';
import { IDB } from 'server/types/db';

export async function getDB(): Promise<IDB> {
  return fs.readJSON(path.resolve('./db.json'));
}

export async function writeDB(db: IDB): Promise<void> {
  await fs.writeJSON(path.resolve('./db.json'), db);
}

const resolvers = {
  Query: {
    async room(parent: void, { roomId }: { roomId: string }): Promise<IRoom | null> {
      const db = await getDB();

      return db.rooms.find(({ id }) => id === roomId) || null;
    },
    async rooms(): Promise<IRoom[]> {
      const db = await getDB();

      return db.rooms;
    },
  },
  Mutation: {
    async createRoom(parent: void, { title, names }: ICreateRoomParams): Promise<IRoom> {
      const newRoom = {
        id: uuid(),
        title,
        users: names.map((name) => ({
          id: uuid(),
          name,
        })),
        costs: [],
        transactions: [],
      };

      const db = await getDB();

      db.rooms.push(newRoom);

      await writeDB(db);

      return newRoom;
    },
    async addRoomCost(parent: void, { roomId, cost }: IAddRoomCostParams): Promise<IRoom | null> {
      const db = await getDB();

      const room = db.rooms.find(({ id }) => id === roomId);

      if (!room) {
        return null;
      }

      room.costs.push({
        id: uuid(),
        ...cost,
      });

      await writeDB(db);

      return room;
    },
    async addRoomTransaction(parent: void, { roomId, transaction }: IAddRoomTransactionParams): Promise<IRoom | null> {
      const db = await getDB();

      const room = db.rooms.find(({ id }) => id === roomId);

      if (!room) {
        return null;
      }

      room.transactions.push({
        id: uuid(),
        ...transaction,
      });

      await writeDB(db);

      return room;
    },
  },
};

export default resolvers;
