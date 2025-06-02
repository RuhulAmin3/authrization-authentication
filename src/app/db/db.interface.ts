export interface IAdmin {
  name: string;
  username: string;
  email: string;
  phone_number: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMIN,
  USER,
  SUPER_ADMIN,
  TEACHER,
}
