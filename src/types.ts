export type TUser = {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  userLevel: 0 | 1 | 2 | 3 | 4;
};

export type TMedication = {
  id: string;
  name: string;
  dosageForm: "Tablet" | "Capsule" | "Solution" | "Cream";
  strength: string;
  meassure: string;
  equivalent: TMedication[];
};

export type TUserMeds = {
  id: string;
  userId: string;
  medId: string;
  status: "Current" | "Discontinued";
  directions: string;
};

export const guestUser: TUser = {
  id: "guest",
  userName: "Guest",
  password: "",
  firstName: "Guest",
  lastName: "Doe",
  userLevel: 0,
};
