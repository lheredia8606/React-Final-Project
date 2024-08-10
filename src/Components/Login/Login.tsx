import { globalUser } from "../../Providers/UserProvider";
import "./login-style.css";
import { useState } from "react";

export const Login = () => {
  const { signIn: autenticateUser } = globalUser();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const onFormSubmit = () => {
    if (autenticateUser(userNameInput, passwordInput)) {
      console.log("user Autenticated");
    } else {
      console.log("user not found");
    }
  };
  return (
    <>
      <div className="login-wrapper">
        <h1>Sign in</h1>
        <div className="login-fields-container">
          <label>Username: </label>
          <input
            type="text"
            value={userNameInput}
            onChange={(e) => setUserNameInput(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="text"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <div>
            <button>Cancel</button>
            <button onClick={onFormSubmit}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
};
