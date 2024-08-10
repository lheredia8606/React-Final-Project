export type TUser = {
  id: string;
  userName: string;
  password: string;
  userLevel: 0 | 1 | 2 | 3 | 4;
};

export type TMedication = {
  id: string;
  name: string;
};

export const guestUser: TUser = {
  id: "guest",
  userName: "Guest",
  password: "",
  userLevel: 0,
};
