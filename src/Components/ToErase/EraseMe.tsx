import { TUser } from "../../types";
import { useUsers } from "./useUsers";

const theUser: Omit<TUser, "id "> = {
  address: "",
  dob: {
    day: "01",
    month: "01",
    year: "2002",
  },
  firstName: "12",
  lastName: "",
  password: "",
  userLevel: 1,
  userName: "asd",
};

export const EraseMe = () => {
  const {
    getAllUsersQuery: { data: allUsers },
    createUserMutation,
  } = useUsers();

  return (
    <>
      <ul>
        {allUsers?.map((user) => {
          return <li key={user.id}>{`${user.firstName}  ${user.lastName}`}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          createUserMutation.mutate(theUser);
        }}
      >
        click me
      </button>
    </>
  );
};
