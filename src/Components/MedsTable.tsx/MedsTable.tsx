import { Fragment } from "react/jsx-runtime";
import { globalUser } from "../../Providers/UserProvider";
import { globalMedication } from "../../Providers/MedicationProvider";
import "./MedTable-style.css";
import { globalUsersMeds } from "../../Providers/UsersMedsProvider";

const MedsTable = () => {
  const { findUserById, currentUser } = globalUser();
  const { findMedById, concatMedAtr } = globalMedication();
  const { allUsersMedications } = globalUsersMeds();

  if (allUsersMedications) {
    return (
      <>
        <div className="user-med-table-wrapper">
          <table className="user-med-table">
            <caption>My Medications</caption>
            <thead>
              <tr>
                <th className="th-patient">Patient</th>
                <th className="th-medication">Medication</th>
                <th className="th-directions">Directions</th>
                <th className="th-prescriber">Prescriber</th>
                <th className="th-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {allUsersMedications.map((userMed, index) => {
                const user = findUserById(userMed.userId);
                const med = findMedById(userMed.medId);
                if (currentUser.id === user?.id)
                  return (
                    <Fragment key={userMed.id}>
                      <tr className={index % 2 === 0 ? "color-row" : ""}>
                        <td>
                          {user
                            ? `${user.firstName} ${user.lastName}`
                            : "unknown user"}
                        </td>
                        <td>{concatMedAtr(med)}</td>
                        <td>{userMed.directions}</td>
                        <td>{userMed.prescriber}</td>
                        <td>{userMed.status}</td>
                      </tr>
                    </Fragment>
                  );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  return (
    <>
      <h2>No Meds</h2>
    </>
  );
};

export default MedsTable;
