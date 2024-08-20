import { useState } from "react";
import { TUser } from "../../../types";

export const UserProfile = ({
  userProfile,
}: {
  userProfile: Partial<TUser>;
}) => {
  const [usernameInput, sertUsernameInput] = useState(
    userProfile.userName || ""
  );
  const [passwordInput, setPasswordInput] = useState(
    userProfile.password || ""
  );
  const [firstNameInput, setFirstNameInput] = useState(
    userProfile.firstName || ""
  );
  const [lastNameInput, setLastNameInput] = useState(
    userProfile.lastName || ""
  );
  const [addressInput, setAddressInput] = useState(userProfile.address || "");
  const [userLevelInput, setUserLevelInput] = useState(
    userProfile.userLevel || 0
  );
  return (
    <>
      <div className="user-profile-wrapper">
        <label>First Name</label>
        <input
          type="text"
          value={firstNameInput}
          onChange={(e) => setFirstNameInput(e.target.value)}
        />
        <label>Last Name</label>
        <input
          type="text"
          value={lastNameInput}
          onChange={(e) => setLastNameInput(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          value={usernameInput}
          onChange={(e) => sertUsernameInput(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <label>Address</label>
        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        />
        <label>User Level</label>
        <select
          id="select-user-level"
          name="options"
          value={userLevelInput}
          onChange={(e) => setUserLevelInput(Number(e.target.value))}
        >
          <option value="0">Guest</option>
          <option value="1">Patient</option>
          <option value="2">Pharmacist</option>
          <option value="3">Provider</option>
          <option value="4">Administrator</option>
        </select>
      </div>
    </>
  );
};
