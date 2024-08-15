import { createContext, ReactNode, useContext, useState } from "react";
import { guestUser, TUser } from "../types";
import { useQuery } from "react-query";
import { ApiCrud } from "../ApiCrud";

type TUserProviderProps = {
  currentUser: TUser;
  signIn: (userName: string, password: string) => TUser | undefined;
  signOut: () => void;
  findUserById: (userIdToFind: string) => TUser | undefined;
  allUsers: TUser[] | undefined;
};

const usersCRUD = new ApiCrud<TUser>("http://localhost:3000/users");

const userContext = createContext({} as TUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<TUser>(guestUser);

  const { data: allUsers, isLoading } = useQuery(
    "fetch-users",
    () => usersCRUD.getAll(),
    {
      select: (response) => response.data,
    }
  );

  const signIn = (userName: string, password: string) => {
    return allUsers?.find((user) => {
      if (
        userName.toLowerCase() === user.userName.toLowerCase() &&
        password === user.password
      ) {
        setCurrentUser(user);
        return user;
      }
    });
  };

  const signOut = () => setCurrentUser(guestUser);

  let usersFound: TUser[] = [];
  const findUserById = (userIdToFind: string) => {
    let foundUser = usersFound.find((user) => {
      return user.id === userIdToFind;
    });
    if (!foundUser) {
      foundUser = allUsers?.find((user) => {
        if (user.id === userIdToFind) {
          usersFound.push(user);
          return true;
        }
      });
    }
    return foundUser;
  };

  if (isLoading) {
    return (
      <>
        <span>Loading</span>
      </>
    );
  }

  return (
    <>
      <userContext.Provider
        value={{
          currentUser,
          signIn,
          signOut,
          allUsers,
          findUserById,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export const globalUser = () => useContext(userContext);
