import { createContext, ReactNode, useContext, useState } from "react";
import { guestUser, TUser } from "../types";
import { useMutation, useQuery } from "react-query";
import { ApiCrud } from "../ApiCrud";
import { AxiosResponse } from "axios";

type TUserProviderProps = {
  currentUser: TUser;
  signIn: (userName: string, password: string) => TUser | undefined;
  signOut: () => void;
  findUserById: (userIdToFind: string) => TUser | undefined;
  allUsers: TUser[] | undefined;
  createNewUser: (user: Omit<TUser, "id">) => void;
};

const userContext = createContext({} as TUserProviderProps);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const usersCRUD = new ApiCrud<TUser>("http://localhost:3000/users");
  const [currentUser, setCurrentUser] = useState<TUser>(guestUser);

  const {
    data: allUsers,
    refetch: refetchAllUsers,
    isLoading: getAllUsersIsLoading,
  } = useQuery("fetch-users", () => usersCRUD.getAll(), {
    select: (response) => response.data,
  });

  const addUserMutation = (onSuccces: () => void) => {
    return useMutation<AxiosResponse<TUser>, Error, Omit<TUser, "id">>(
      usersCRUD.create,
      {
        onSuccess: () => onSuccces(),
      }
    );
  };

  const { mutate: createUser } = addUserMutation(refetchAllUsers);

  const createNewUser = (user: Omit<TUser, "id">) => {
    createUser(user);
  };

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

  if (getAllUsersIsLoading) {
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
          createNewUser: createNewUser,
        }}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export const useGlobalUser = () => useContext(userContext);
