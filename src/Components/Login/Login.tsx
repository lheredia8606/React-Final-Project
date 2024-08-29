import { useNavigate } from "react-router-dom";
import "./login-style.css";
import { useEffect, useRef, useState } from "react";
import { useUsers } from "../ToErase/useUsers";

export const Login = () => {
  const navigate = useNavigate();
  const { signIn: autenticateUser, currentUser } = useUsers();
  const [userNameInput, setUserNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const onSubmit = () => {
    const userData = autenticateUser(userNameInput, passwordInput);

    if (userData) {
      navigate(`/userpage/${userData.id}`);
    } else {
      console.log("user not found");
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <div
        className="login-wrapper"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSubmit();
          }
        }}
      >
        <h1>Sign in</h1>
        <div className="login-fields-container">
          <label>Username: </label>
          <input
            type="text"
            ref={inputRef}
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
            <button onClick={() => navigate(`/userpage/${currentUser.id}`)}>
              Cancel
            </button>
            <button onClick={onSubmit}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
};
