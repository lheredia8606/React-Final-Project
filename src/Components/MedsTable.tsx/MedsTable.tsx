import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalMedication } from "../../Providers/MedicationProvider";
import "./MedTable-style.css";
import { useGlobalUsersMeds } from "../../Providers/UsersMedsProvider";
import { useGlobalUser } from "../../Providers/userProvider/UserProvider";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TUserMeds } from "../../TypesAndHelpers/types";

const MedsTable = () => {
  const { findUserById, currentUser } = useGlobalUser();
  const { findMedById, concatMedAtr } = useGlobalMedication();
  const { allUserMedications, patchUserMedMutation } = useGlobalUsersMeds();

  const patchUserMed = (userMed: Partial<TUserMeds>) => {
    patchUserMedMutation.mutate(userMed);
  };

  if (!allUserMedications.data || allUserMedications.data.length === 0) {
    return <h2>No Meds</h2>;
  }

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
            {allUserMedications.data.map((userMed, index) => {
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
                      <td className="flex-centered">
                        {userMed.status === "Current" ? (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="status-check"
                            onClick={() => {
                              if (currentUser.userLevel == "2")
                                patchUserMed({
                                  id: userMed.id,
                                  status: "Discontinued",
                                });
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="status-cross"
                            onClick={() => {
                              patchUserMed({
                                id: userMed.id,
                                status: "Current",
                              });
                            }}
                          />
                        )}
                      </td>
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

export default MedsTable;
