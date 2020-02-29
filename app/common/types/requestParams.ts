import { ICost } from 'common/types/room';

export interface ICreateRoomParams {
  title: string;
  names: string[];
}

export interface IAddRoomCost {
  roomId: string;
  cost: Omit<ICost, 'id'>;
}
