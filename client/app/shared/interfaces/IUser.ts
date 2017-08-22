import { IEvent } from './'

export interface IUser {
  id: string;
  name: string;
  username: string;
  email?: string;
  registered?: Date,
  work_place?: string;
  events?: IEvent[]
}
