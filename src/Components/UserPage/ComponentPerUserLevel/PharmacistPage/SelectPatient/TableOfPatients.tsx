import React, { useState } from "react";
import { TUser } from "../../../../../TypesAndHelpers/types";

type UserTableProps = {
  patients: TUser[];
  setSelectedPatient: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

export const TableOfPatients: React.FC<UserTableProps> = ({
  patients,
  setSelectedPatient,
}) => {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);

  const handleRowClick = (user: TUser) => {
    setSelectedUser(user);
  };

  const handleSelectClick = () => {
    if (selectedUser) {
      setSelectedPatient(selectedUser);
    } else {
      console.log("No user selected");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedUser?.id === user.id ? "#f0f0f0" : "white",
              }}
            >
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSelectClick}>Select</button>
    </div>
  );
};
