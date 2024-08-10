import { createContext, ReactNode, useContext, useState } from "react";
import { TMedication } from "../types";
import { globalUser } from "./UserProvider";

type TMedicationProviderProps = {
  medicationList: TMedication[];
};

const medicationContext = createContext({} as TMedicationProviderProps);

export const MedicationProvider = ({ children }: { children: ReactNode }) => {
  const { autenticatedUser: user } = globalUser();
  const [allMedicationList, setAllMedicationList] = useState<TMedication[]>([]);
  return <>{children}</>;
};

export const globalMedication = () => useContext(medicationContext);
