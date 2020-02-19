import uuid from 'uuid/v4';

import { IRoom } from 'common/types/room';

const rooms: IRoom[] = [
  {
    id: '1',
    users: ['a', 'b'],
    link: uuid()
  }
];

const resolvers = {
  Query: {
    rooms(): IRoom[] {
      return rooms;
    }
  },
  Mutation: {
    addRoom(parent: any, { users }: { users: string[] }): IRoom {
      const newRoom = {
        id: String(Date.now()),
        users,
        link: uuid()
      };

      rooms.push(newRoom);

      return newRoom;
    }
  }
};

export default resolvers;
