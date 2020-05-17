import { ICost, ITransaction } from 'common/types/room';

export interface ICreateRoomParams {
  title: string;
  names: string[];
}

export interface IAddRoomCostParams {
  roomId: string;
  cost: Omit<ICost, 'id'>;
}

export interface IAddRoomTransactionParams {
  roomId: string;
  transaction: Omit<ITransaction, 'id'>;
}
