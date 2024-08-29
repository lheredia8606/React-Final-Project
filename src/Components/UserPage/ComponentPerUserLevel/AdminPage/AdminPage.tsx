import { Link, Outlet } from "react-router-dom";
import "./admin-page-style.css";
import { useUsers } from "../../../ToErase/useUsers";
export const AdminPage = () => {
  const { currentUser } = useUsers();
  return (
    <>
      <div className="admin-wrapper">
        <div className="admin-sideBar">
          <Link
            to={`/userPage/${currentUser.id}/createUser`}
            className="nav-bar-link"
          >
            Create User
          </Link>
          <Link
            to={`/userPage/${currentUser.id}/myProfile`}
            className="nav-bar-link"
          >
            My Profile
          </Link>
        </div>
        <Outlet />
      </div>
    </>
  );
};
