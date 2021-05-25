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

export interface IRoom {
  id: string;
  title: string;
  users: IUser[];
  costs: ICost[];
  transactions: ITransaction[];
}
