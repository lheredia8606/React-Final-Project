import { useState } from "react";
import { TUser } from "../../../TypesAndHelpers/types";
import "./user-profile-style.css";
import { DatePicker } from "./DatePicker/DatePicker";
import { useGlobalUser } from "../../../Providers/userProvider/UserProvider";

export const UserProfile = ({
  userProfile,
}: {
  userProfile: Partial<TUser>;
}) => {
  const {
    createUserMutation,
    userPatchMutation,
    currentUser,
    handleSetCurrentUser,
  } = useGlobalUser();

  const getTheNewUser = () => {
    const theNewUser: Partial<TUser> = {
      id: userProfile.id,
      userName: usernameInput,
      password: passwordInput,
      address: addressInput,
      dob: {
        day: dayInput,
        month: monthInput,
        year: yearInput,
      },
      firstName: firstNameInput,
      lastName: lastNameInput,
      userLevel: userLevelInput,
    };
    return theNewUser;
  };
  const onCreate = (theUser: Partial<TUser>) => {
    createUserMutation.mutate(theUser);
  };

  const onUpdate = (theUser: Partial<TUser>) => {
    console.log("updating the user");
    userPatchMutation.mutate(theUser);
    if (currentUser.id === theUser.id) {
      handleSetCurrentUser(theUser as TUser);
    }
  };

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
  const [userLevelInput, setUserLevelInput] = useState<
    "0" | "1" | "2" | "3" | "4"
  >(userProfile.userLevel || "0");
  const [monthInput, setMonthInput] = useState(userProfile.dob?.month || "");
  const [dayInput, setDayInput] = useState(userProfile.dob?.day || "");
  const [yearInput, setYearInput] = useState(userProfile.dob?.year || "");
  return (
    <>
      <div className="user-profile-wrapper">
        <div className="firstName-wrapper">
          <label>First Name: </label>
          <input
            type="text"
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.target.value)}
          />
        </div>
        <div className="lastName-wrapper">
          <label>Last Name: </label>
          <input
            type="text"
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.target.value)}
          />
        </div>
        <div className="userName-wrapper">
          <label>Username</label>
          <input
            type="text"
            value={usernameInput}
            onChange={(e) => sertUsernameInput(e.target.value)}
          />
        </div>
        <div className="div-wrapper">
          <label>Password</label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
        </div>
        <div className="div-wrapper">
          <label>Address</label>
          <input
            type="text"
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
          />
        </div>
        <div className="div-wrapper">
          <DatePicker
            dayInput={dayInput}
            monthInput={monthInput}
            yearInput={yearInput}
            setDayInput={setDayInput}
            setMonthInput={setMonthInput}
            setYearInput={setYearInput}
          />
        </div>
        <div className="div-wrapper">
          <label>User Level</label>
          <select
            disabled={currentUser.userLevel !== "4"}
            id="select-user-level"
            name="options"
            value={userLevelInput}
            onChange={(e) =>
              setUserLevelInput(
                e.target.value as unknown as "0" | "1" | "2" | "3" | "4"
              )
            }
          >
            <option value={0}>Guest</option>
            <option value={1}>Patient</option>
            <option value={2}>Pharmacist</option>
            <option value={3}>Provider</option>
            <option value={4}>Administrator</option>
          </select>
        </div>
        <div className="div-wrapper controls">
          {userProfile.id ? (
            <button
              onClick={() => {
                onUpdate(getTheNewUser());
              }}
            >
              Update
            </button>
          ) : (
            <button>Create</button>
          )}
        </div>
      </div>
    </>
  );
};
