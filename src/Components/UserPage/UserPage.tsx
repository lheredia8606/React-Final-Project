import { useParams } from "react-router-dom";
import { Welcome } from "../Welcome";
import { AdminPage } from "./ComponentPerUserLevel/AdminPage/AdminPage";
import { PatientPage } from "./ComponentPerUserLevel/PatientPage/PatientPage";
import { PharmacistPage } from "./ComponentPerUserLevel/PharmacistPage/PharmacistPage";
import { PrescriberPage } from "./ComponentPerUserLevel/PrescriberPage/ProviderPage";
import { useGlobalUser } from "../../Providers/userProvider/UserProvider";

export const UserPage = () => {
  const { id } = useParams();
  const { currentUser } = useGlobalUser();
  if (id !== currentUser.id)
    return (
      <>
        <h2>Check your credentials, please sign in</h2>
      </>
    );

  return (
    <>
      {currentUser.userLevel === "guest" && <Welcome />}
      {currentUser.userLevel === "patient" && <PatientPage />}
      {currentUser.userLevel === "pharmacist" && <PharmacistPage />}
      {currentUser.userLevel === "prescriber" && <PrescriberPage />}
      {currentUser.userLevel === "admin" && <AdminPage />}
    </>
  );
};
