import { Review } from "../../types/types";

const getCommentsList = async (query: { queryKey: string[] }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/comments/get/` + query.queryKey[1]
    );
    if (!response.ok) return [];
    const data: Review[] = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

export default getCommentsList;
