import { createContext, ReactNode, useContext } from "react";
import { TMedication } from "../types";
import { ApiCrud } from "../ApiCrud";
import { useQuery } from "react-query";

type TMedicationProviderProps = {
  allFetchedMeds: TMedication[] | undefined;
  findMedById: (medId: string) => TMedication | undefined;
  concatMedAtr: (med: TMedication | undefined) => string;
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
  const findMedById = (medId: string) => {
    return allFetchedMeds?.find((medication) => medication.id === medId);
  };

  const concatMedAtr = (med: TMedication | undefined) => {
    if (med)
      return `${med.name} ${med.strength} ${med.meassure} ${med.dosageForm}`;
    return "medication not found";
  };
  return (
    <>
      <medicationContext.Provider
        value={{ allFetchedMeds, findMedById, concatMedAtr }}
      >
        {children}
      </medicationContext.Provider>
    </>
  );
};

export const useGlobalMedication = () => useContext(medicationContext);
