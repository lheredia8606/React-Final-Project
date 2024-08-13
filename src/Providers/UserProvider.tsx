import { createContext, ReactNode, useContext, useState } from "react";
import { guestUser, TUser } from "../types";
import { useQuery } from "react-query";
import { ApiCrud } from "../ApiCrud";

type TUserProviderProps = {
  currentUser: TUser;
  signIn: (userName: string, password: string) => TUser | undefined;
  signOut: () => void;
  allUsers: TUser[] | undefined;
};

const usersCRUD = new ApiCrud<TUser>("http://localhost:3000/users");

const userContext = createContext({} as TUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: allUsers, isLoading } = useQuery(
    "fetch-users",
    () => usersCRUD.getAll(),
    {
      select: (response) => response.data,
    }
  );

  const [currentUser, setCurrentUser] = useState<TUser>(guestUser);
  const signIn = (userName: string, password: string) => {
    return allUsers?.find((user) => {
      if (
        userName.toLowerCase() === user.userName.toLowerCase() &&
        password === user.password
      ) {
        setCurrentUser(user);
        console.log(`user found ${user.userName}`);
        console.log(`curent user ${currentUser.userName}`);
        return user;
      }
    });
  };

  const signOut = () => setCurrentUser(guestUser);

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
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export const globalUser = () => useContext(userContext);
