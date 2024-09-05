import { useState } from "react";
import { SelectPatient } from "./SelectPatient/SelectPatient";
import { TUser } from "../../../../TypesAndHelpers/types";

export const PharmacistPage = () => {
  const [selectedPatient, setSelectedPatient] = useState<TUser | undefined>(
    undefined
  );
  return (
    <>
      {!selectedPatient ? (
        <SelectPatient setSelectedPatient={setSelectedPatient} />
      ) : (
        <>
          <label>{selectedPatient.firstName}</label>
        </>
      )}
      <button
        onClick={() => {
          setSelectedPatient(undefined);
        }}
      >
        Back
      </button>
    </>
  );
};
