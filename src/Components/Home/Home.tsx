import { useGlobalUser } from "../../Providers/userProvider/UserProvider";
import "./home-style.css";
import { Link, Outlet } from "react-router-dom";
export const Home = () => {
  const { currentUser, signOut } = useGlobalUser();
  return (
    <>
      <header>
        <div className="logo">
          <span>Logo</span>
        </div>
        <nav>
          <ul className="nav-ul">
            <li>
              <Link to={`/userPage/${currentUser.id}`} className="link-button">
                Home
              </Link>
            </li>
            {currentUser.userLevel === "guest" ? (
              <li>
                <Link to="/login" className="link-button">
                  Sign in
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to={`/userpage/guest`}
                  className="link-button"
                  onClick={signOut}
                >
                  Sign out
                </Link>
              </li>
            )}
            <li>
              <Link to="/about" className="link-button">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="main-container">
        <Outlet />
      </div>
      <footer></footer>
    </>
  );
};
