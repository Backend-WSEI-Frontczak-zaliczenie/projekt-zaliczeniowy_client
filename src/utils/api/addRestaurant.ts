const addRestaurant = async (name: string, type: string, city: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/restaurants/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        city,
        adultOnly: true,
        rating: 0,
      }),
    }
  );
  if (response.status === 200) return await response.json();
  throw new Error("Unable to add restaurant.");
};

export default addRestaurant;
