import uuid from 'uuid/v4';

import { ICost, IRoom } from 'common/types/room';

const rooms: IRoom[] = [];

export interface ICreateRoomParams {
  title: string;
  names: string[];
}

export interface IAddRoomCost {
  roomId: string;
  cost: Omit<ICost, 'id'>;
}

const resolvers = {
  Query: {
    room(parent: void, { roomId }: { roomId: string }): IRoom | null {
      return rooms.find(({ id }) => id === roomId) || null;
    },
    rooms(): IRoom[] {
      return rooms;
    }
  },
  Mutation: {
    createRoom(parent: void, { title, names }: ICreateRoomParams): IRoom {
      const newRoom = {
        id: uuid(),
        title,
        users: names.map((name) => ({
          id: uuid(),
          name
        })),
        costs: []
      };

      rooms.push(newRoom);

      return newRoom;
    },
    addRoomCost(parent: void, { roomId, cost }: IAddRoomCost): IRoom | null {
      const room = rooms.find(({ id }) => id === roomId);

      if (!room) {
        return null;
      }

      room.costs.push({
        id: uuid(),
        ...cost
      });

      return room;
    }
  }
};

export default resolvers;
