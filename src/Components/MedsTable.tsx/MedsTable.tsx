import { Fragment } from "react/jsx-runtime";
import { globalUser } from "../../Providers/UserProvider";
import { TUser, TUserMeds } from "../../types";
import { findUserById } from "./medTabHelpers";

type TMedsTableProps = {
  userMeds: TUserMeds[] | undefined;
};

const MedsTable = ({ userMeds }: TMedsTableProps) => {
  const { allUsers } = globalUser();
  let usersFound: TUser[] = [];
  const getUserName = (userId: string) => {
    const { userName, usersAlreadyFound } = findUserById(
      userId,
      usersFound,
      allUsers
    );
    usersFound = usersAlreadyFound;
    return userName;
  };
  if (userMeds) {
    return (
      <>
        <table>
          <caption>Medications</caption>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Medication</th>
              <th>Directions</th>
              <th>Prescriber</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {userMeds.map((userMed, index) => {
              console.log(userMed);

              return (
                <Fragment key={userMed.id}>
                  <tr className={index % 2 === 0 ? "color-row" : ""}>
                    <td>{getUserName(userMed.userId)}</td>
                    <td></td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
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
