export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: Date;
  created_by: string;
  updatedAt: Date;
  updated_by: string;
  isActive: boolean;
}

export interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  username?: string;
  oldPassword?: string;
  newPassword?: string;
  isActive?: boolean;
}
