import { useMutation, useQuery } from "react-query";
import { createItem, getAllItems } from "./userFetch";
import { guestUser, TUser } from "../../types";
import { useState } from "react";

const endPoint = "http://localhost:3000/users";
const getStoredUser = (): TUser => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    return JSON.parse(storedUser) as TUser;
  }
  return guestUser;
};

export const useUsers = () => {
  const [currentUser, setCurrentUser] = useState<TUser>(getStoredUser);

  const getAllUsersQuery = useQuery({
    queryKey: "getAllUsers",
    queryFn: () => getAllItems<TUser>(endPoint),
  });

  const createUserMutation = useMutation({
    mutationFn: (input: Omit<TUser, "id">) => createItem(endPoint, input),
    onSuccess: () => {
      console.log("user created");
      getAllUsersQuery.refetch();
    },
    onError: () => {
      console.log("Error creating the user");
    },
  });
  const signIn = (userName: string, password: string) => {
    return getAllUsersQuery.data?.find((user) => {
      if (
        userName.toLowerCase() === user.userName.toLowerCase() &&
        password === user.password
      ) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setCurrentUser(user);
        return user;
      }
    });
  };
  const signOut = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(guestUser);
  };

  const findUserById = (userIdToFind: string) => {
    return getAllUsersQuery.data?.find((user) => {
      if (user.id === userIdToFind) {
        return true;
      }
    });
  };

  return {
    getAllUsersQuery,
    createUserMutation,
    currentUser,
    signIn,
    signOut,
    findUserById,
  };
};
