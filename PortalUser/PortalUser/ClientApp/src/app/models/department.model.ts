import { IUserModel } from "./user.model";

export interface IDepartment {
  id: number,
  title: string,
  users: IUserModel[]
}
