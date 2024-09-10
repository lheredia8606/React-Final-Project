import React, { Fragment } from "react";
import { TMedication } from "../../../TypesAndHelpers/types";
type TMedicationsTable = {
  medications: TMedication[];
};
const MedicationsTable: React.FC<TMedicationsTable> = ({ medications }) => {
  return (
    <>
      <div className="table-wrapper">
        <label>Select the medication</label>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Strength</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((medication, index) => {
              return (
                <Fragment key={medication.id}>
                  <tr className={index % 2 === 0 ? "color-row" : ""}>
                    <td>{medication.name}</td>
                    <td>{medication.strength}</td>
                    <td>{medication.dosageForm}</td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MedicationsTable;
