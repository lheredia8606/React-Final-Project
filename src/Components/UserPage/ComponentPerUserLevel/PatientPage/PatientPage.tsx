import { globalMedication } from "../../../../Providers/MedicationProvider";
import { globalUser } from "../../../../Providers/UserProvider";
import { globalUsersMeds } from "../../../../Providers/UsersMedsProvider";
import MedsTable from "../../../MedsTable.tsx/MedsTable";

export const PatientPage = () => {
  const { currentUser } = globalUser();
  const { allFetchedMeds } = globalMedication();
  const { allUsersMedications } = globalUsersMeds();
  console.log(allUsersMedications);

  return (
    <>
      <MedsTable userMeds={allUsersMedications} />
    </>
  );
};
