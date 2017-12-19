import { IEntity } from './'

export interface IUser extends IEntity {
  username?: string;
  email?: string;
  registered?: Date,
  work_place?: string;
  gender?: string;
  avatarUrl?: string;
  avatart?: any;
  events?: IEntity[]
}
