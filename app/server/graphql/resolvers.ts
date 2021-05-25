import path from 'path';
import fs from 'fs-extra';
import uuid from 'uuid/v4';
import dayjs from 'dayjs';

import { IRoom } from 'common/types/room';
import {
  IAddRoomCostParams,
  IAddRoomTransactionParams,
  ICreateRoomParams,
  IDeleteRoomCostParams, IDeleteRoomTransactionParams,
} from 'common/types/requestParams';
import { IDB } from 'server/types/db';

export async function getDB(): Promise<IDB> {
  return fs.readJSON(path.resolve('./db.json'));
}

export async function writeDB(db: IDB): Promise<void> {
  await fs.writeJSON(path.resolve('./db.json'), db);
}

interface ISession {
  rooms?: { id: string; title: string }[];
}

const resolvers = {
  Query: {
    async room(parent: void, { roomId }: { roomId: string }, context: { session: ISession }): Promise<IRoom | null> {
      context.session.rooms = context.session.rooms || [];

      const db = await getDB();

      const room = db.rooms.find(({ id }) => id === roomId) || null;

      if (room && !context.session.rooms.find(({ id }) => id === roomId)) {
        context.session.rooms.push({ id: roomId, title: room.title });
      }

      return room;
    },
    async rooms(): Promise<IRoom[]> {
      const db = await getDB();

      return db.rooms;
    },
  },
  Mutation: {
    async createRoom(parent: void, { title, names }: ICreateRoomParams, context: { session: ISession }): Promise<IRoom> {
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

      context.session.rooms = context.session.rooms || [];

      context.session.rooms.push({
        id: newRoom.id,
        title: newRoom.title,
      });

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
        date: dayjs().format(),
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
        date: dayjs().format(),
        ...transaction,
      });

      await writeDB(db);

      return room;
    },

    async deleteRoomCost(parent: void, { roomId, costId }: IDeleteRoomCostParams): Promise<IRoom> {
      const db = await getDB();

      const room = db.rooms.find(({ id }) => id === roomId);

      if (!room) {
        throw new Error('There is no such room');
      }

      const costToDeleteIndex = room.costs.findIndex((cost) => cost.id === costId);

      room.costs.splice(costToDeleteIndex, 1);

      await writeDB(db);

      return room;
    },
    async deleteRoomTransaction(parent: void, { roomId, transactionId }: IDeleteRoomTransactionParams): Promise<IRoom> {
      const db = await getDB();

      const room = db.rooms.find(({ id }) => id === roomId);

      if (!room) {
        throw new Error('There is no such room');
      }

      const transactionToDeleteIndex = room.transactions.findIndex((cost) => cost.id === transactionId);

      room.transactions.splice(transactionToDeleteIndex, 1);

      await writeDB(db);

      return room;
    },
  },
};

export default resolvers;
