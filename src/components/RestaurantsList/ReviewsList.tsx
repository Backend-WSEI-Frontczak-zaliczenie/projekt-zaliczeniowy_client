import { useQuery } from "@tanstack/react-query";
import { Box, Typography } from "@mui/material";
import getCommentsList from "../../utils/api/getCommentsList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import WriteReview from "./WriteReview";
import { Review } from "../../types/types";
import removeComment from "../../utils/api/removeComment";

interface ReviewsListProps {
  restaurantId: number;
  isAdmin: boolean;
}

export enum ListState {
  Read = "read",
  Edit = "edit",
  Remove = "remove",
}

const ReviewsList = ({ restaurantId, isAdmin }: ReviewsListProps) => {
  const [listState, setListState] = useState<ListState>(ListState.Read);
  const [reviewToEdit, setReviewToEdit] = useState<Review | null>(null);
  const { data: reviews, isLoading } = useQuery(
    ["commentsList", restaurantId],
    () => getCommentsList(restaurantId)
  );

  const reviewsList = reviews
    ? reviews.map((review) => {
        const { id, textContent } = review;
        return (
          <Box
            key={id + textContent}
            sx={{
              width: "100%",
            }}
          >
            <Typography variant="subtitle1">
              <b>Review ID: {id}</b>
              {isAdmin && (
                <Box
                  sx={{
                    display: "inline-block",
                    float: "right",
                    ">*:hover": { opacity: 0.5, cursor: "pointer" },
                  }}
                >
                  <EditIcon
                    onClick={() => {
                      setListState(ListState.Edit);
                      setReviewToEdit(review);
                    }}
                    sx={{
                      width: 25,
                      mb: 0.5,
                    }}
                  />
                  <DeleteIcon
                    onClick={() => {
                      setListState(ListState.Remove);
                      setReviewToEdit(review);
                    }}
                    sx={{ width: 25, mb: 0.5 }}
                  />
                </Box>
              )}
            </Typography>
            <Typography gutterBottom variant="body2" color="text.secondary">
              {textContent}
            </Typography>
          </Box>
        );
      })
    : "No reviews";

  switch (listState) {
    case ListState.Read:
      return reviewsList;
    case ListState.Edit:
      return (
        <WriteReview
          restaurantId={restaurantId}
          isEdit={true}
          review={reviewToEdit}
          setIsWriteReview={setListState}
        />
      );
    case ListState.Remove:
      reviewToEdit && removeComment(reviewToEdit.id);
  }
  return <div>{isLoading ? <p>Loading reviews...</p> : null}</div>;
};

export default ReviewsList;
