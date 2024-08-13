import { createContext, ReactNode, useContext } from "react";
import { TUserMeds } from "../types";
import { ApiCrud } from "../ApiCrud";
import { useQuery } from "react-query";

type TUsersMedsProviderProps = {
  allUsersMedications: TUserMeds[] | undefined;
};
const userMedsCRUD = new ApiCrud<TUserMeds>("http://localhost:3000/userMeds");
const userMedsContext = createContext({} as TUsersMedsProviderProps);

export const UsersMedsProvider = ({ children }: { children: ReactNode }) => {
  const { data: allUsersMedications } = useQuery(
    "fetch-users-meds",
    () => userMedsCRUD.getAll(),
    {
      select: (response) => response.data,
    }
  );
  return (
    <userMedsContext.Provider value={{ allUsersMedications }}>
      {children}
    </userMedsContext.Provider>
  );
};

export const globalUsersMeds = () => useContext(userMedsContext);
