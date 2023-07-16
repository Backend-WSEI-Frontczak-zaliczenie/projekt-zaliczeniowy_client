const editRestaurant = async (
  restaurantId: number,
  name: string,
  type: string,
  city: string
) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/restaurants/edit/` + restaurantId,
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
  if (response.status === 200) return;
  throw new Error("Unable to edit restaurant.");
};

export default editRestaurant;
