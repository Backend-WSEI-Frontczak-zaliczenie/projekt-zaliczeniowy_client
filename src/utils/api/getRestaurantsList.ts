import { RestaurantItem } from "../../types/types";

const getRestaurantsList = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/restaurants/getAll`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) return [];
    const data: RestaurantItem[] = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default getRestaurantsList;
