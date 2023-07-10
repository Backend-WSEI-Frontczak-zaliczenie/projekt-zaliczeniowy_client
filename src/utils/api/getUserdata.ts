import { Roles, User } from "../../types/types";

const getCurrentUserData = async () =>
  new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "John Doe",
        role: Roles.User,
      });
    }, 1000);
  });

export default getCurrentUserData;
