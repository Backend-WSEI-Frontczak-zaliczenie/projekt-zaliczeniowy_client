import { Review } from "../../types/types";

const getReviewsList = async () =>
  new Promise<Review[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          restaurantId: 4,
          textContent: "The best restaurant!",
        },
        {
          id: 2,
          restaurantId: 4,
          textContent: "Thanks for everything!",
        },
        {
          id: 3,
          restaurantId: 4,
          textContent: "Wow! That was amazing food!",
        },
      ]);
    }, 1000);
  });

export default getReviewsList;
