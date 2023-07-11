import { RestaurantItem } from "../../types/types";

const getRestaurantsList = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/restaurants/getAll`
  );
  const data = await response.json();
  return data as RestaurantItem[];
};

export default getRestaurantsList;
