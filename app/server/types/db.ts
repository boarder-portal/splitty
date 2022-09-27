import { IRoom } from 'common/types/room';

export interface IDBMeta {
  version: number;
}

export interface IDB {
  rooms: IRoom[];
}
