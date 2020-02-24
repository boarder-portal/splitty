import uuid from 'uuid/v4';

import { IRoom } from 'common/types/room';

const rooms: IRoom[] = [];

export interface ICreateRoomParams {
  title: string;
  users: string[];
}

const resolvers = {
  Query: {
    rooms(): IRoom[] {
      return rooms;
    }
  },
  Mutation: {
    createRoom(parent: void, { title, users }: ICreateRoomParams): IRoom {
      const newRoom = {
        id: uuid(),
        title,
        users
      };

      rooms.push(newRoom);

      return newRoom;
    }
  }
};

export default resolvers;
