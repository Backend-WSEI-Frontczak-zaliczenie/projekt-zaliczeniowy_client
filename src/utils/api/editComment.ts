import { Review } from "../../types/types";

const editComment = async (commentId: number, textContent: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/edit/` + commentId,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        textContent,
      }),
    }
  );
  if (response.status === 200) return;
  throw new Error("Unable to edit comment.");
};

export default editComment;
