import { useQuery } from "@tanstack/react-query";
import getReviewsList from "../../utils/api/getReviewsList";
import { Typography } from "@mui/material";

interface ReviewsListProps {
  restaurantId: number;
}

const ReviewsList = ({ restaurantId }: ReviewsListProps) => {
  const { data: reviews } = useQuery(["reviewsList"], getReviewsList);

  const reviewsList = reviews?.map(({ id, textContent }) => (
    <div>
      <Typography variant="subtitle1">
        <b>Review ID: {id}</b>
      </Typography>
      <Typography gutterBottom variant="body2" color="text.secondary">
        {textContent}
      </Typography>
    </div>
  ));
  return <div>{reviewsList}</div>;
};

export default ReviewsList;
