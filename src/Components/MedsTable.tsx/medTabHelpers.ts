import { TUser } from "../../types";
import { TfindUserById } from "./types";

export const findUserById = (
  userIdToFind: string,
  usersAlreadyFound: TUser[],
  allUsers: TUser[] | undefined
): TfindUserById => {
  let foundUser = usersAlreadyFound.find((user) => {
    return user.id === userIdToFind;
  });
  if (!foundUser) {
    foundUser = allUsers?.find((user) => {
      if (user.id === userIdToFind) {
        usersAlreadyFound.push(user);
        return true;
      }
    });
  }
  const userName = foundUser
    ? `${foundUser.firstName} ${foundUser.lastName}`
    : "unknown user";

  return {
    userName,
    usersAlreadyFound,
  };
};
