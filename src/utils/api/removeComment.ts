const removeComment = async (commentId: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/comments/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        commentId,
      }),
      credentials: "include",
    }
  );
  if (response.status === 200) return;
  throw new Error("Unable to remove comment.");
};

export default removeComment;
