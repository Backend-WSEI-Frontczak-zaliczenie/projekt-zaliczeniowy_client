import { Box, Button, TextField } from "@mui/material";

//interface WriteReviewProps {}

const WriteReview = () => {
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
        multiline
        rows={4}
        variant="filled"
        sx={{
          pb: 3,
        }}
      />
      <Button variant="contained">Submit the review</Button>
    </Box>
  );
};

export default WriteReview;
