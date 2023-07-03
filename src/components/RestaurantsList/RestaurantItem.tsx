import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { RestaurantItem } from "../../types/types";

function RestaurantsItem({ item }: { item: RestaurantItem }) {
  const { name, type, city, region, image } = item;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={`${name} image`}
      />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography gutterBottom variant="subtitle1">
          <LocationOnIcon /> {region}, {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {type}
        </Typography>
      </CardContent>
      <CardActions>
        {/* TO DO, button only visible for user */}
        <Button variant="contained" size="medium" fullWidth>
          Reserve a table
        </Button>
      </CardActions>
    </Card>
  );
}
export default RestaurantsItem;
