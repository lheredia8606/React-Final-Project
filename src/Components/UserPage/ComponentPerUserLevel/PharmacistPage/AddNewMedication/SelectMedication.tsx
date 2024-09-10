import React, { useState } from "react";
import { useGlobalMedication } from "../../../../../Providers/MedicationProvider";
import { TMedication } from "../../../../../TypesAndHelpers/types";
import MedicationsTable from "../../../../Tables/Medications/MedicationsTable";

type TSelectMedication = {
  setSelectedMedication: React.Dispatch<
    React.SetStateAction<TMedication | null>
  >;
};

export const SelectMedication: React.FC<TSelectMedication> = ({
  setSelectedMedication,
}) => {
  const [medicationName, setMedicationName] = useState("");

  const [isSelectingMedication, setIsSelectingMedication] = useState(false);
  const [medicationsToChoose, setMedicationsToChoose] = useState<TMedication[]>(
    []
  );
  const [errorMesage, setErrorMessage] = useState<string | null>(null);
  const { findMedications } = useGlobalMedication();

  const getMedications = () => {
    const medicationsFound = findMedications(medicationName);
    if (medicationsFound.length === 0) setErrorMessage("No medications found");
    else if (medicationsFound.length === 1) {
      setSelectedMedication(medicationsFound[0]);
    } else {
      setIsSelectingMedication(true);
      setMedicationsToChoose(medicationsFound);
    }
  };
  return (
    <>
      <div
        style={{
          border: "1px solid black",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3>Add new medication to user</h3>
        {isSelectingMedication && (
          <>
            <MedicationsTable medications={medicationsToChoose} />
          </>
        )}
        {!isSelectingMedication && (
          <div>
            <input
              placeholder="Medication Name"
              type="text"
              value={medicationName}
              onChange={(e) => {
                setMedicationName(e.target.value);
              }}
            />
            <button onClick={() => getMedications()}>Add</button>
            {errorMesage && (
              <label style={{ color: "red" }}>{errorMesage}</label>
            )}
          </div>
        )}
      </div>
    </>
  );
};
