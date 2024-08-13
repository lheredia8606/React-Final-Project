import { TUser } from "../../types";

export type TfindUserById = {
  userName: string;
  usersAlreadyFound: TUser[];
};
