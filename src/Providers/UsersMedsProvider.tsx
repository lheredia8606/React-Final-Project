import { createContext, ReactNode, useContext } from "react";
import { TUserMeds } from "../TypesAndHelpers/types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { getAllItems, patchItem } from "../TypesAndHelpers/apiHelpers";
import { queryClient } from "../main";

type TUsersMedsProviderProps = {
  allUserMedications: UseQueryResult<TUserMeds[], unknown>;
  patchUserMedMutation: UseMutationResult<
    TUserMeds,
    unknown,
    Partial<TUserMeds>,
    unknown
  >;
};
const endPoint = "http://localhost:3000/userMeds";
const userMedsContext = createContext({} as TUsersMedsProviderProps);

export const UsersMedsProvider = ({ children }: { children: ReactNode }) => {
  const allUserMedications = useQuery({
    queryKey: "fetch-users-meds",
    queryFn: () => getAllItems<TUserMeds>(endPoint),
  });

  const patchUserMedMutation = useMutation({
    mutationFn: (userMed: Partial<TUserMeds>) => patchItem(endPoint, userMed),
    onSuccess: () => queryClient.invalidateQueries("fetch-users-meds"),
  });
  return (
    <userMedsContext.Provider
      value={{ allUserMedications, patchUserMedMutation }}
    >
      {children}
    </userMedsContext.Provider>
  );
};

export const useGlobalUsersMeds = () => useContext(userMedsContext);
