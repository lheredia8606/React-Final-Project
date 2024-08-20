import { globalUser } from "../../Providers/UserProvider";
import { UserProfile } from "./UserProfile/UserProfile";

export const CurrentUserProfile = () => {
  const { currentUser } = globalUser();
  return (
    <>
      <UserProfile userProfile={currentUser} />
    </>
  );
};
