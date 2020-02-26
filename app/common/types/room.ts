export interface IUser {
  id: string;
  name: string;
}

export interface ICost {
  id: string;
  value: number;
  from: string;
  to: string[];
}

export interface IRoom {
  id: string;
  title: string;
  users: IUser[];
  costs: ICost[];
}
