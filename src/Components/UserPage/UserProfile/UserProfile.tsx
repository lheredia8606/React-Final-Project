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
    "guest" | "patient" | "pharmacist" | "prescriber" | "admin"
  >(userProfile.userLevel || "guest");
  const [monthInput, setMonthInput] = useState(userProfile.dob?.month || "");
  const [dayInput, setDayInput] = useState(userProfile.dob?.day || "");
  const [yearInput, setYearInput] = useState(userProfile.dob?.year || "");

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
    sertUsernameInput("");
    setPasswordInput("");
    setFirstNameInput("");
    setLastNameInput("");
    setAddressInput("");
    setMonthInput("");
    setDayInput("");
    setYearInput("");
  };

  const onUpdate = (theUser: Partial<TUser>) => {
    console.log("updating the user");
    userPatchMutation.mutate(theUser);
    if (currentUser.id === theUser.id) {
      handleSetCurrentUser(theUser as TUser);
    }
  };

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
            disabled={currentUser.userLevel !== "admin"}
            id="select-user-level"
            name="options"
            value={userLevelInput}
            onChange={(e) =>
              setUserLevelInput(
                e.target.value as unknown as
                  | "guest"
                  | "patient"
                  | "pharmacist"
                  | "prescriber"
                  | "admin"
              )
            }
          >
            <option value={"guest"}>Guest</option>
            <option value={"patient"}>Patient</option>
            <option value={"pharmacist"}>Pharmacist</option>
            <option value={"prescriber"}>Provider</option>
            <option value={"admin"}>Administrator</option>
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
            <button
              onClick={() => {
                onCreate(getTheNewUser());
              }}
            >
              Create
            </button>
          )}
        </div>
      </div>
    </>
  );
};
