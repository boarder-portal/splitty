import uuid from 'uuid/v4';

import { IRoom } from 'common/types/room';
import { IAddRoomCost, ICreateRoomParams } from 'common/types/requestParams';

const rooms: IRoom[] = [];

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
