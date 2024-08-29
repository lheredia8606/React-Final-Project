import { useUsers } from "../../ToErase/useUsers";
import { UserProfile } from "./UserProfile";

export const CurrentUserProfile = () => {
  const { currentUser } = useUsers();
  return (
    <>
      <UserProfile userProfile={currentUser} />
    </>
  );
};
