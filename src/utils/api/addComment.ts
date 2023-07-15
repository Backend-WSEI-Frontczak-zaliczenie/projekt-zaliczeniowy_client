const addComment = async (restaurantId: number, textContent: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/comments/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      restaurantId,
      textContent,
    }),
  });
  if (response.status === 200) return;
  throw new Error("Unable to add comment.");
};

export default addComment;
