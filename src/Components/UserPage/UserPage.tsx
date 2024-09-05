import { useParams } from "react-router-dom";
import { Welcome } from "../Welcome";
import { AdminPage } from "./ComponentPerUserLevel/AdminPage/AdminPage";
import { PatientPage } from "./ComponentPerUserLevel/PatientPage/PatientPage";
import { PharmacistPage } from "./ComponentPerUserLevel/PharmacistPage/PharmacistPage";
import { ProviderPage } from "./ComponentPerUserLevel/ProviderPage/ProviderPage";
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
      {currentUser.userLevel === "0" && <Welcome />}
      {currentUser.userLevel === "1" && <PatientPage />}
      {currentUser.userLevel === "2" && <PharmacistPage />}
      {currentUser.userLevel === "3" && <ProviderPage />}
      {currentUser.userLevel === "4" && <AdminPage />}
    </>
  );
};
