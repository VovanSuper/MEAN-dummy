import { IEntity } from './';

export interface IEvent extends IEntity {
  description?: String;
  startTime?: Date,
  endTime?: Date,
  createdAt?: Date,
  createdBy?: string,
  participants?: IEntity[];
}
