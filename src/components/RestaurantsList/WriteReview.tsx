import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import addComment from "../../utils/api/addComment";
import { ReviewsStates } from "../../types/types";

interface WriteReviewProps {
  restaurantId: number;
  setIsWriteReview: React.Dispatch<React.SetStateAction<ReviewsStates>>;
}

const WriteReview = ({ restaurantId, setIsWriteReview }: WriteReviewProps) => {
  const [reviewContent, setReviewContent] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    if (reviewContent) {
      setError("");

      addComment(restaurantId, reviewContent).catch((error) => {
        setError(error.message);
      });
      setReviewContent("");
      setIsWriteReview("read");
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

        <Typography component="h6" variant="subtitle2" color="error">
          {error}
        </Typography>
      </Box>
    </Box>
  );
};

export default WriteReview;
