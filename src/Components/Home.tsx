import { ReactNode } from "react";
import { globalUser } from "../Providers/UserProvider";
import "./home-style.css";
export const Home = ({ children }: { children: ReactNode }) => {
  const { currentUser, signOut } = globalUser();
  return (
    <>
      <header>
        <div className="logo">
          <span>Logo</span>
        </div>
        <nav>
          <ul className="nav-ul">
            <li>
              <button>Home</button>
            </li>
            {currentUser.userLevel === 0 ? (
              <li>
                <button>Sign in</button>
              </li>
            ) : (
              <li>
                <button onClick={signOut}>Sign out</button>
              </li>
            )}
            <li>
              <button>About</button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-container">{children}</div>
      <footer></footer>
    </>
  );
};
