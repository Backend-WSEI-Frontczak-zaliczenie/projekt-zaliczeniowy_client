import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import addCommentRequest from "../../utils/api/addComment";
import { Review } from "../../types/types";
import editCommentRequest from "../../utils/api/editComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ListState } from "./ReviewsList";

interface WriteReviewProps {
  restaurantId: number;
  setIsWriteReview: any;
  isEdit?: boolean;
  review?: Review | null;
}

const WriteReview = ({
  restaurantId,
  isEdit,
  review,
  setIsWriteReview,
}: WriteReviewProps) => {
  const queryClient = useQueryClient();
  const [reviewContent, setReviewContent] = useState<string>(
    isEdit && review ? review.textContent : ""
  );
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { mutate: editComment } = useMutation({
    mutationFn: (data: { id: number; textContent: string }) =>
      editCommentRequest(data.id, data.textContent),

    onSuccess: () => {
      queryClient
        .invalidateQueries(["commentsList", restaurantId])
        .then(() => setIsWriteReview(ListState.Read));
    },
    onError: () => {
      setError("Something went wrong.");
    },
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (data: { reviewContent: string }) =>
      addCommentRequest(restaurantId, data.reviewContent),
    onSuccess: () => {
      queryClient
        .invalidateQueries(["commentsList", restaurantId])
        .then(() => setIsWriteReview(ListState.Read));
    },
    onError: () => {
      setError("Something went wrong.");
    },
  });

  const handleSubmit = () => {
    if (reviewContent) {
      setError("");

      if (isEdit) {
        review &&
          editComment({
            id: review.id,
            textContent: reviewContent,
          });
      } else {
        addComment({ reviewContent });
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
