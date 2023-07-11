import { clearUserData } from "../queryClient";

export const logout = () => {
  clearUserData();
  // TODO: send request to the server
  return new Promise((resolve, reject) => {
    console.log("logout");
    resolve(null);
  });
};
