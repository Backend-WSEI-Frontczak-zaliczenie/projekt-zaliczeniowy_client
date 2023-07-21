import { clearUserData } from "../queryClient";

export const logout = async () => {
  // TODO: send request to the server
  try {
    const result = await fetch(
      `${import.meta.env.VITE_API_URL}/Identity/Logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!result.ok) throw new Error("Something went wrong with logout");
    clearUserData();
  } catch (error) {
    console.log(error);
  }
  return true;
};
