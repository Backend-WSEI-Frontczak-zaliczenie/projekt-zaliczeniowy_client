import { useQuery } from "@tanstack/react-query";
import { Typography } from "@mui/material";
import getCommentsList from "../../utils/api/getCommentsList";

interface ReviewsListProps {
  restaurantId: number;
}

const ReviewsList = ({ restaurantId }: ReviewsListProps) => {
  const { data: reviews, isLoading } = useQuery(
    ["commentsList", restaurantId],
    getCommentsList as any
  );

  const reviewsList = reviews
    ? reviews.map(
        ({ id, textContent }: { id: number; textContent: string }) => (
          <div key={textContent}>
            <Typography variant="subtitle1">
              <b>Review ID: {id}</b>
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {textContent}
            </Typography>
          </div>
        )
      )
    : "No reviews";
  return <div>{isLoading ? <p>Loading reviews...</p> : reviewsList}</div>;
};

export default ReviewsList;
