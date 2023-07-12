import { Review } from "../../types/types";

const getReviewsList = async (
  restaurandId: Pick<Review, "restaurantId">["restaurantId"]
) =>
  new Promise<Review[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          restaurantId: restaurandId,
          textContent: "The best restaurant!" + restaurandId,
        },
        {
          id: 2,
          restaurantId: restaurandId,
          textContent: "Thanks for everything!" + restaurandId,
        },
        {
          id: 3,
          restaurantId: restaurandId,
          textContent: "Wow! That was amazing food!" + restaurandId,
        },
      ]);
    }, 1000);
  });

export default getReviewsList;
