export interface IUser {
  id: string;
  name: string;
}

export interface ICost {
  id: string;
  value: number;
  from: string;
  to: string[];
  description: string;
  date?: string;
}

export interface ITransaction {
  id: string;
  value: number;
  from: string;
  to: string;
  date?: string;
}

export enum EHistoryType {
  ADD_COST = 'ADD_COST',
  ADD_TRANSACTION = 'ADD_TRANSACTION',
  DELETE_COST = 'DELETE_COST',
  DELETE_TRANSACTION = 'DELETE_TRANSACTION',
}

export interface IBaseHistoryItem {
  date: string;
}

export interface IHistoryCostItem extends IBaseHistoryItem {
  type: EHistoryType.ADD_COST | EHistoryType.DELETE_COST;
  data: ICost;
}

export interface IHistoryTransactionItem extends IBaseHistoryItem {
  type: EHistoryType.ADD_TRANSACTION | EHistoryType.DELETE_TRANSACTION;
  data: ITransaction;
}

export type THistoryItem = IHistoryCostItem | IHistoryTransactionItem;

export function isCostHistoryItem(item: THistoryItem): item is IHistoryCostItem {
  return item.type === EHistoryType.ADD_COST || item.type === EHistoryType.DELETE_COST;
}

export function isTransactionHistoryItem(item: THistoryItem): item is IHistoryTransactionItem {
  return item.type === EHistoryType.ADD_TRANSACTION || item.type === EHistoryType.DELETE_TRANSACTION;
}

export interface IRoom {
  id: string;
  title: string;
  users: IUser[];
  costs: ICost[];
  transactions: ITransaction[];
  costHistoryItems: IHistoryCostItem[];
  transactionHistoryItems: IHistoryTransactionItem[];
}
