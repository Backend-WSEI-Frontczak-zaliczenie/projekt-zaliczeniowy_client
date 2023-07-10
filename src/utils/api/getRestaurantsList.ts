import { RestaurantItem } from "../../types/types";

const getRestaurantsList = async () =>
  new Promise<RestaurantItem[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: "Restaurant 1",
          type: "big",
          city: "Kraków",
          region: "Stare miasto",
          rating: 4,
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        },
        {
          name: "Restaurant 2",
          type: "medium",
          city: "Kraków",
          region: "Krowodrza górka",
          rating: 3,
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        },
        {
          name: "Restaurant 3",
          type: "very small",
          city: "Kraków",
          region: "Kazimierz",
          rating: 5,
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        },
      ]);
    }, 1000);
  });

export default getRestaurantsList;
