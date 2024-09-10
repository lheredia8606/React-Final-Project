import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalMedication } from "../../../Providers/MedicationProvider";
import "./UserMedTable-style.css";
import { useGlobalUsersMeds } from "../../../Providers/UsersMedsProvider";
import { useGlobalUser } from "../../../Providers/userProvider/UserProvider";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { TUser, TUserMeds } from "../../../TypesAndHelpers/types";

const MedsTable = ({ user }: { user: TUser | null }) => {
  const { currentUser } = useGlobalUser();

  const { findUserById } = useGlobalUser();
  const { findMedById, concatMedAtr } = useGlobalMedication();
  const { allUserMedications, patchUserMedMutation } = useGlobalUsersMeds();

  const patchUserMed = (userMed: Partial<TUserMeds>) => {
    patchUserMedMutation.mutate(userMed);
  };

  const tryTochangeStatus = (
    userMedId: string,
    status: "Discontinued" | "Current"
  ) => {
    if (currentUser.userLevel == "pharmacist")
      patchUserMed({
        id: userMedId,
        status,
      });
  };

  if (!user) user = currentUser;

  if (!allUserMedications.data || allUserMedications.data.length === 0) {
    return <h2>No Meds</h2>;
  }

  return (
    <>
      <div className="user-med-table-wrapper">
        <label>{`${user.firstName} ${user.lastName} medications:`}</label>
        <table className="user-med-table">
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
              const userFound = findUserById(userMed.userId);
              const med = findMedById(userMed.medId);
              if (user.id === userFound?.id)
                return (
                  <Fragment key={userMed.id}>
                    <tr className={index % 2 === 0 ? "color-row" : ""}>
                      <td>
                        {userFound
                          ? `${userFound.firstName} ${userFound.lastName}`
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
                              tryTochangeStatus(userMed.id, "Discontinued");
                            }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="status-cross"
                            onClick={() => {
                              tryTochangeStatus(userMed.id, "Current");
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
