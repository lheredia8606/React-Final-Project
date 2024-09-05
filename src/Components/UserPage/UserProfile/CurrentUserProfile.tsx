import { useGlobalUser } from "../../../Providers/userProvider/UserProvider";
import { UserProfile } from "./UserProfile";

export const CurrentUserProfile = () => {
  const { currentUser } = useGlobalUser();
  return (
    <>
      <UserProfile userProfile={currentUser} />
    </>
  );
};
