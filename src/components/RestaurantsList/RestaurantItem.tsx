import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { RestaurantItem, Roles } from "../../types/types";
import { useState } from "react";
import getCurrentUserData from "../../utils/api/getUserdata";
import { useQuery } from "@tanstack/react-query";
import { defaultUser } from "../../constants";
import ReviewsList from "./ReadReviews";
import WriteReview from "./WriteReview";

type ReviewsStates = "write" | "read" | null;

function RestaurantsItem({ item }: { item: RestaurantItem }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [isWriteReview, setIsWriteReview] = useState<ReviewsStates>("read");

  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleToggleChange = (
    _event: React.MouseEvent<HTMLElement>,
    isWrite: ReviewsStates
  ) => {
    setIsWriteReview(isWrite);
  };

  const { data: user } = useQuery(["userData"], getCurrentUserData),
    currentUser = user || defaultUser;

  const { name, type, city, region, rating, image } = item;

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="restaurants_item">
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={`${name} image`}
        />
        <CardContent className="restaurants_item__content">
          <Typography variant="h5">{name}</Typography>
          <Typography gutterBottom variant="subtitle1">
            <LocationOnIcon /> {region}, {city}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Type: {type}
          </Typography>
        </CardContent>
        {currentUser.role === Roles.User && (
          <CardActions>
            <Button
              onClick={handleModalOpen}
              variant="contained"
              size="medium"
              fullWidth
            >
              Check Reviews
            </Button>
          </CardActions>
        )}
      </Card>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: "80vh",
            bgcolor: "white",
            border: "2px solid #000",
            borderRadius: "5px",
            boxShadow: 24,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            pt: 2,
            px: 4,
            pb: 3,
          }}
          className="restaurants_item__modal"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="space-between"
            flexWrap={"wrap"}
            gap={2}
          >
            <ToggleButtonGroup
              color="standard"
              value={isWriteReview}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
              size="small"
            >
              <ToggleButton value="write">Write Review</ToggleButton>
              <ToggleButton value="read">Read Reviews</ToggleButton>
            </ToggleButtonGroup>

            <h4>{name}</h4>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            alignItems="flex-start"
            flexWrap={"wrap"}
          >
            {isWriteReview === "write" ? (
              <WriteReview />
            ) : isWriteReview === "read" ? (
              <ReviewsList restaurantId={1} />
            ) : (
              <Typography variant="subtitle1">
                Choose one options from above.
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}
export default RestaurantsItem;
