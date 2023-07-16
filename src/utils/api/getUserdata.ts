import { Roles, User } from "../../types/types";
import { defaultUser } from "../../constants";

const getCurrentUserData = async () =>
  new Promise<User | null>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        role: Roles.Admin,
      });
    }, 1000);
  }).then((data) => data ?? defaultUser);

export default getCurrentUserData;
