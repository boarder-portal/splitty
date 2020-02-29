import { ICost, ITransaction } from 'common/types/room';

export interface ICreateRoomParams {
  title: string;
  names: string[];
}

export interface IAddRoomCost {
  roomId: string;
  cost: Omit<ICost, 'id'>;
}

export interface IAddRoomTransaction {
  roomId: string;
  transaction: Omit<ITransaction, 'id'>;
}
