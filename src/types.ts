import { ComponentProps } from "react";

export type TUser = {
  id?: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  userLevel: 0 | 1 | 2 | 3 | 4;
  address: string;
  dob: TCustomDate;
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
  prescriber: string;
};

export type TCustomDate = {
  month: string;
  day: string;
  year: string;
};

export const guestUser: TUser = {
  id: "guest",
  userName: "Guest",
  password: "",
  firstName: "Guest",
  lastName: "Doe",
  userLevel: 0,
  address: "",
  dob: {
    month: "01",
    day: "25",
    year: "1952",
  },
};

export type InputProps = ComponentProps<"input">;
