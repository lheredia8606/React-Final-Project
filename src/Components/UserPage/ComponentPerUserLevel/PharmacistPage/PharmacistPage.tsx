import { useEffect, useState } from "react";
import { SelectPatient } from "./SelectPatient/SelectPatient";
import {
  guestUser,
  TMedication,
  TUser,
} from "../../../../TypesAndHelpers/types";
import { SelectMedication } from "./AddNewMedication/SelectMedication";
import MedsTable from "../../../Tables/UserMedication/UserMedTable";
import { useGlobalUser } from "../../../../Providers/userProvider/UserProvider";

export const PharmacistPage = () => {
  const [directionsInput, setDirectionsInput] = useState("");
  const [isErrorInPrescriber, setIsErrorInPrescriber] = useState(false);
  const [prescriberInput, setPrescriberInput] = useState<TUser | undefined>(
    undefined
  );
  const [selectedPatient, setSelectedPatient] = useState<TUser | undefined>(
    undefined
  );
  const [selectedMedication, setSelectedMedication] =
    useState<TMedication | null>(null);
  const { getAllUsersByLevel } = useGlobalUser();
  const allPrescribers = getAllUsersByLevel("prescriber");
  //i neee to erase this useeffect
  useEffect(() => {
    setSelectedPatient(guestUser);
  }, []);

  const findPrescriberByName = (fullName: string) => {
    const [firstName, lastName] = fullName.split(" ");
    const prescriber = allPrescribers.find((p) => {
      console.log(`"${p.firstName}"`);
      console.log(`"${firstName}"`);
      console.log(`"${p.lastName}"`);
      console.log(`"${lastName}"`);
      return p.firstName === firstName && p.lastName === lastName;
    });
    console.log(prescriber);
    if (prescriber) setPrescriberInput(prescriber);
    console.log(prescriberInput);
  };
  return (
    <>
      {!selectedPatient && (
        <SelectPatient setSelectedPatient={setSelectedPatient} />
      )}
      {selectedPatient && !selectedMedication && (
        <>
          <SelectMedication setSelectedMedication={setSelectedMedication} />
        </>
      )}
      {selectedPatient && selectedMedication && (
        <>
          <div>
            <label>Directions</label>
            <input
              type="text"
              value={directionsInput}
              onChange={(e) => {
                setDirectionsInput(e.target.value);
              }}
            />
            <label>Prescriber:</label>
            <input
              type="text"
              list="prescribers"
              onChange={(e) => {
                findPrescriberByName(e.target.value);
                e.target.value.length === 0 || prescriberInput
                  ? setIsErrorInPrescriber(false)
                  : setIsErrorInPrescriber(true);
              }}
            />

            <datalist id="prescribers">
              {allPrescribers.map((prescriber) => (
                <option
                  key={prescriber.id}
                  value={`${prescriber.firstName} ${prescriber.lastName}`}
                ></option>
              ))}
            </datalist>
          </div>
          {isErrorInPrescriber && !prescriberInput && (
            <label style={{ color: "red" }}>
              No Prescriber found with that name
            </label>
          )}
        </>
      )}
      {selectedPatient && <MedsTable user={selectedPatient} />}

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
