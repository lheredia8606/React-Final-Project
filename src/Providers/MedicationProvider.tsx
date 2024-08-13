import { createContext, ReactNode, useContext } from "react";
import { TMedication } from "../types";
import { ApiCrud } from "../ApiCrud";
import { useQuery } from "react-query";

type TMedicationProviderProps = {
  allFetchedMeds: TMedication[] | undefined;
};

const medicationCRUD = new ApiCrud<TMedication>(
  "http://localhost:3000/medications"
);

const medicationContext = createContext({} as TMedicationProviderProps);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const { data: allFetchedMeds } = useQuery(
    "fetch-meds",
    () => medicationCRUD.getAll(),
    {
      select: (response) => {
        if (response.data) {
          return response.data;
        }
        return [];
      },
    }
  );
  return (
    <>
      <medicationContext.Provider value={{ allFetchedMeds }}>
        {children}
      </medicationContext.Provider>
    </>
  );
};

export const globalMedication = () => useContext(medicationContext);
