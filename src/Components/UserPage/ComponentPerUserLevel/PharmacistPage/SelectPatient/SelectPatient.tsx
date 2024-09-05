import { useState } from "react";
import { useGlobalUser } from "../../../../../Providers/userProvider/UserProvider";
import { TUser } from "../../../../../TypesAndHelpers/types";
import { DatePicker } from "../../../UserProfile/DatePicker/DatePicker";
import { TableOfPatients } from "./TableOfPatients";
type TselectPatient = {
  setSelectedPatient: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

export const SelectPatient = ({ setSelectedPatient }: TselectPatient) => {
  const [dayInput, setDayInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const [wasPatientsFound, setwasPatientsFound] = useState(true);
  const [patientsToSelect, setPatientsToSelect] = useState<TUser[]>([]);

  const { getAllPatients } = useGlobalUser();

  const getPatientsByDOB = () => {
    return getAllPatients().filter((patient) => {
      return (
        patient.dob.day === dayInput &&
        patient.dob.month === monthInput &&
        patient.dob.year === yearInput
      );
    });
  };

  const handleOnClick = () => {
    const patientsFount = getPatientsByDOB();
    if (patientsFount.length === 0) {
      setwasPatientsFound(false);
    } else if (patientsFount.length === 1) {
      setSelectedPatient(patientsFount[0]);
    } else {
      setPatientsToSelect(patientsFount);
      setIsSelecting(true);
    }
  };
  return (
    <>
      <div className="find-user-wrapper"></div>
      <DatePicker
        dayInput={dayInput}
        monthInput={monthInput}
        yearInput={yearInput}
        setDayInput={setDayInput}
        setMonthInput={setMonthInput}
        setYearInput={setYearInput}
      />
      <button
        onClick={() => {
          handleOnClick();
        }}
      >
        Find user
      </button>
      {!wasPatientsFound && (
        <label style={{ color: "red" }}>No patients Found!!</label>
      )}
      {isSelecting && (
        <TableOfPatients
          patients={patientsToSelect}
          setSelectedPatient={setSelectedPatient}
        ></TableOfPatients>
      )}
    </>
  );
};
