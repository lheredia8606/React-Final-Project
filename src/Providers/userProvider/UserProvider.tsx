import { createContext, ReactNode, useContext, useState } from "react";
import { guestUser, TUser } from "../../TypesAndHelpers/types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import {
  createItem,
  getAllItems,
  patchItem,
} from "../../TypesAndHelpers/apiHelpers";
import { queryClient } from "../../main";
import { flushSync } from "react-dom";

type TUserProviderProps = {
  getAllUsersQuery: UseQueryResult<TUser[], unknown>;
  createUserMutation: UseMutationResult<
    unknown,
    unknown,
    Partial<TUser>,
    unknown
  >;
  userPatchMutation: UseMutationResult<TUser, unknown, Partial<TUser>, unknown>;
  currentUser: TUser;
  signIn: (userName: string, password: string) => TUser | undefined;
  signOut: () => void;
  findUserById: (userIdToFind: string) => TUser | undefined;
  handleSetCurrentUser: (user: TUser | undefined) => void;
  getAllUsersByLevel: (userLevel: TUser["userLevel"]) => TUser[];
};

const userContext = createContext<TUserProviderProps>({} as TUserProviderProps);
const endPoint = "http://localhost:3000/users";
const getStoredUser = (): TUser => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return guestUser;
};
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<TUser>(getStoredUser());
  const handleSetCurrentUser = (user: TUser | undefined) => {
    if (user) {
      flushSync(() => {
        setCurrentUser(user);
      });
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
      setCurrentUser(guestUser);
    }
  };

  const getAllUsersQuery = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllItems<TUser>(endPoint),
  });

  const createUserMutation = useMutation({
    mutationFn: (input: Partial<TUser>) => createItem(endPoint, input),
    onSuccess: () => {
      queryClient.invalidateQueries("getAllUsers");
    },
    onError: () => {
      console.log("Error creating the user");
    },
  });

  const userPatchMutation = useMutation({
    mutationFn: (user: Partial<TUser>) => {
      return patchItem(endPoint, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("getAllUsers");
    },
  });

  const signIn = (userName: string, password: string) => {
    return getAllUsersQuery.data?.find((user) => {
      if (
        userName.toLowerCase() === user.userName.toLowerCase() &&
        password === user.password
      ) {
        handleSetCurrentUser(user);
        return user;
      }
    });
  };

  const signOut = () => {
    handleSetCurrentUser(undefined);
  };

  const findUserById = (userIdToFind: string) => {
    return getAllUsersQuery.data?.find((user) => {
      if (user.id === userIdToFind) {
        return true;
      }
    });
  };
  const getAllUsersByLevel = (userLevel: TUser["userLevel"]) => {
    if (getAllUsersQuery.data) {
      return getAllUsersQuery.data?.filter((user) => {
        return user.userLevel === userLevel;
      });
    }
    return [];
  };

  return (
    <userContext.Provider
      value={{
        currentUser,
        findUserById,
        getAllUsersQuery,
        createUserMutation,
        userPatchMutation,
        signIn,
        signOut,
        handleSetCurrentUser,
        getAllUsersByLevel,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const useGlobalUser = () => {
  const context = useContext(userContext);
  if (!context)
    throw new Error(
      `Dont use 'useUserGlobal' outside the scope of a user Provider`
    );
  return context;
};
