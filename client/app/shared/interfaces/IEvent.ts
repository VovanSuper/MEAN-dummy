import { IUser } from './IUser';

export interface IEvent {
  id?: string;
  name: string;
  description?: String;
  startTime?: Date,
  endTime?: Date,
  createdAt?: Date,
  createdBy?: string,
  participants?: IUser[];
}
