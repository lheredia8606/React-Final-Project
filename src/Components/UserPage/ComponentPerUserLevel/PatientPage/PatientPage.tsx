import { Link } from "react-router-dom";
import MedsTable from "../../../MedsTable.tsx/MedsTable";
import "./patient-page-style.css";

export const PatientPage = () => {
  return (
    <>
      <div className="patient-wrapper">
        <div className="patient-sideBar">
          <Link to="" className="nav-bar-link">
            My Medications
          </Link>
          <Link to="" className="nav-bar-link">
            My Profile
          </Link>
        </div>
        <MedsTable />
      </div>
    </>
  );
};
