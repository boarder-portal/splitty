const rooms = [{id: '1', users: ['a', 'b']}];

const resolvers = {
  Query: {
    rooms() {
      return rooms;
    }
  },
  Mutation: {
    addRoom(parent: any, { users }: { users: string[] }): { id: string; users: string[]; } {
      const newRoom = {
        id: String(Date.now()),
        users
      };

      rooms.push(newRoom);

      return newRoom;
    }
  }
};

export default resolvers;
