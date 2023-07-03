import Container from "@mui/material/Container";
import { useQuery } from "@tanstack/react-query";
import getRestaurantsList from "../../utils/api/getRestaurantsList";
import { Grid } from "@mui/material";
import RestaurantItem from "./RestaurantItem";

function RestaurantsList() {
  const { data: list } = useQuery(["restaurantsList"], getRestaurantsList);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        {list?.map((item) => (
          <Grid key={item.name} item md={4} sm={6} xs={12}>
            <RestaurantItem item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default RestaurantsList;
