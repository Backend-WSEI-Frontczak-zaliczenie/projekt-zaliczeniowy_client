import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import addComment from "../../utils/api/addComment";
import { Review, ReviewsStates } from "../../types/types";
import editComment from "../../utils/api/editComment";

interface WriteReviewProps {
  restaurantId: number;
  setIsWriteReview?: React.Dispatch<React.SetStateAction<ReviewsStates>>;
  isEdit?: boolean;
  review?: Review | null;
}

const WriteReview = ({
  restaurantId,
  setIsWriteReview,
  isEdit,
  review,
}: WriteReviewProps) => {
  const [reviewContent, setReviewContent] = useState<string>(
    isEdit && review ? review.textContent : ""
  );
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = () => {
    if (reviewContent) {
      setError("");

      if (isEdit) {
        review &&
          editComment(review?.id, reviewContent).catch((error) => {
            setError(error.message);
          });
      } else {
        addComment(restaurantId, reviewContent).catch((error) => {
          setError(error.message);
        });
      }

      setReviewContent("");
      setError("");
      setMessage(isEdit ? "Review edited." : "Review added.");
    } else {
      setError("The review cannot be empty.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="space-around"
      flexWrap={"wrap"}
    >
      <TextField
        id="outlined-multiline-static"
        label="Your review"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        multiline
        rows={4}
        variant="filled"
        sx={{
          pb: 3,
        }}
      />
      <Box
        sx={{
          textAlign: "center",
          height: 200,
        }}
      >
        <Button
          sx={{
            mb: 1,
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit the review
        </Button>

        <Typography
          component="h6"
          variant="subtitle2"
          color={error ? "error" : "success.main"}
        >
          {error ? error : message}
        </Typography>
      </Box>
    </Box>
  );
};

export default WriteReview;
