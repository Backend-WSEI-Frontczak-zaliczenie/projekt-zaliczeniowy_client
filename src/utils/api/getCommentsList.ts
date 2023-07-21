import { Review } from "../../types/types";

const getCommentsList = async (restaurandId: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/get/` + restaurandId,
      {
        credentials: "include",
      }
    );
    if (!response.ok) return [];
    const data: Review[] = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default getCommentsList;
