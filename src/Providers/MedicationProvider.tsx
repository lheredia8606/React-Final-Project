import { createContext, ReactNode, useContext } from "react";
import { TMedication } from "../TypesAndHelpers/types";
import { useQuery, UseQueryResult } from "react-query";
import { getAllItems } from "../TypesAndHelpers/apiHelpers";

type TMedicationProviderProps = {
  getAllMedicationQuery: UseQueryResult<TMedication[], unknown>;
  findMedById: (medId: string) => TMedication | undefined;
  concatMedAtr: (med: TMedication | undefined) => string;
  findMedications: (nameStr: string) => TMedication[];
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

  /**
   * Find all medications that meet the conditions
   *
   * @param  - nameStr  the name and the strength of the medication to find concatenated by ","
   * @returns TMedication[]
   * @example enal,20  will return all medication whit the name starting in enal and the strength 20
   */
  const findMedications = (nameStr: string) => {
    const [name, strength = ""] = nameStr.split(",");
    if (getAllMedicationQuery.data)
      return getAllMedicationQuery.data.filter((medication) => {
        return (
          medication.name.toLowerCase().startsWith(name.toLocaleLowerCase()) &&
          medication.strength.startsWith(strength)
        );
      });
    return [];
  };

  const concatMedAtr = (med: TMedication | undefined) => {
    if (med)
      return `${med.name} ${med.strength} ${med.meassure} ${med.dosageForm}`;
    return "medication not found";
  };
  return (
    <>
      <medicationContext.Provider
        value={{
          getAllMedicationQuery,
          findMedById,
          concatMedAtr,
          findMedications,
        }}
      >
        {children}
      </medicationContext.Provider>
    </>
  );
};

export const useGlobalMedication = () => useContext(medicationContext);
