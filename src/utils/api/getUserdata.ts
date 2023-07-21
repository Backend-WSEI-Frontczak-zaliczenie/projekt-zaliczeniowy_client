import { User } from "../../types/types";
import { defaultUser } from "../../constants";

const getCurrentUserData = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/Identity/Info`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) return defaultUser;
    const data: User = await response.json();
    if (data.roles.length === 0) return { ...data, roles: ["User"] };
    return data;
  } catch (error) {
    return defaultUser;
  }
};

export default getCurrentUserData;
