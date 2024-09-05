import { Link, Outlet } from "react-router-dom";
import "./patient-page-style.css";
import { useGlobalUser } from "../../../../Providers/userProvider/UserProvider";

export const PatientPage = () => {
  const { currentUser } = useGlobalUser();
  return (
    <>
      <div className="patient-wrapper">
        <div className="patient-sideBar">
          <Link
            to={`/userPage/${currentUser.id}/myMeds`}
            className="nav-bar-link"
          >
            My Medications
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
