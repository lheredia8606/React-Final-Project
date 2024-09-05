import { createContext, ReactNode, useContext } from "react";
import { TMedication } from "../TypesAndHelpers/types";
import { useQuery, UseQueryResult } from "react-query";
import { getAllItems } from "../TypesAndHelpers/apiHelpers";

type TMedicationProviderProps = {
  getAllMedicationQuery: UseQueryResult<TMedication[], unknown>;
  findMedById: (medId: string) => TMedication | undefined;
  concatMedAtr: (med: TMedication | undefined) => string;
};

const url = "http://localhost:3000/medications";

const medicationContext = createContext({} as TMedicationProviderProps);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const getAllMedicationQuery = useQuery({
    queryFn: () => getAllItems<TMedication>(url),
    queryKey: "getAllMedications",
  });

  const findMedById = (medId: string) => {
    return getAllMedicationQuery.data?.find(
      (medication) => medication.id === medId
    );
  };

  const concatMedAtr = (med: TMedication | undefined) => {
    if (med)
      return `${med.name} ${med.strength} ${med.meassure} ${med.dosageForm}`;
    return "medication not found";
  };
  return (
    <>
      <medicationContext.Provider
        value={{ getAllMedicationQuery, findMedById, concatMedAtr }}
      >
        {children}
      </medicationContext.Provider>
    </>
  );
};

export const useGlobalMedication = () => useContext(medicationContext);
