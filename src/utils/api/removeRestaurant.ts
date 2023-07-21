const removeRestaurant = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/restaurants/delete`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
      credentials: "include",
    }
  );
  if (response.status === 200) return;
  throw new Error("Unable to remove comment.");
};

export default removeRestaurant;
