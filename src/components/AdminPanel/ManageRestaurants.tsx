import { useQuery } from "@tanstack/react-query";
import getRestaurantsList from "../../utils/api/getRestaurantsList";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RestaurantItem } from "../../types/types";
import removeRestaurant from "../../utils/api/removeRestaurant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import addRestaurant from "../../utils/api/addRestaurant";
import editRestaurant from "../../utils/api/editRestaurant";

enum ModalType {
  Add = "Add",
  Edit = "Edit",
  Remove = "Remove",
}

const ManageRestaurants = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.Add);
  const [error, setError] = useState<string>("");
  const [currentRestaurant, setCurrentRestaurant] =
    useState<RestaurantItem | null>(null);

  const { data: list } = useQuery(["restaurantsList"], getRestaurantsList);

  const handleModalOpen = (type: ModalType, id?: number) => {
    if (type) {
      id && setCurrentRestaurant(list?.find((item) => item.id === id) || null);
      setModalType(type);
      setModalOpen(true);
    }
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

  const queryClient = useQueryClient();

  const removeMutation = useMutation({
    mutationFn: (id: number) => removeRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantsList"],
      });
      handleModalClose();
    },
  });

  const addMutation = useMutation({
    mutationFn: (args: Omit<RestaurantItem, "rating" | "adultOnly">) =>
      addRestaurant(args.name, args.type, args.city),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantsList"],
      });
      handleModalClose();
    },
  });

  const editMutation = useMutation({
    mutationFn: (args: { restaurantId: number } & RestaurantItem) =>
      editRestaurant(args.restaurantId, args.name, args.type, args.city),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurantsList"],
      });
      handleModalClose();
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    modalType: ModalType
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name") as string;
    const type = data.get("type") as string;
    const city = data.get("city") as string;

    if (modalType === ModalType.Add) {
      addMutation.mutate({ name, type, city } as RestaurantItem);
    } else {
      currentRestaurant &&
        editMutation.mutate({
          restaurantId: currentRestaurant.id,
          name,
          type,
          city,
        } as { restaurantId: number } & RestaurantItem);
    }
  };

  const removeContent = (
    <Box sx={{ textAlign: "center", width: 250 }}>
      <Typography variant="body2" color="text.secondary">
        Are you sure, that you want to remove this restaurant?
      </Typography>
      <ButtonGroup sx={{ mt: 2 }} variant="outlined">
        <Button
          onClick={() =>
            currentRestaurant && removeMutation.mutate(currentRestaurant.id)
          }
          color="success"
        >
          Yes
        </Button>
        <Button onClick={() => handleModalClose()} color="error">
          No
        </Button>
      </ButtonGroup>
    </Box>
  );

  const modalForm = (modalType: ModalType) => {
    return (
      <Box
        component="form"
        onChange={() => setError("")}
        onSubmit={(e) => handleSubmit(e, modalType)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              defaultValue={
                currentRestaurant && modalType === ModalType.Edit
                  ? currentRestaurant.name
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="type"
              label="Type"
              type="type"
              id="type"
              autoComplete="type"
              defaultValue={
                currentRestaurant && modalType === ModalType.Edit
                  ? currentRestaurant.type
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="city"
              label="City"
              type="city"
              id="city"
              autoComplete="city"
              defaultValue={
                currentRestaurant && modalType === ModalType.Edit
                  ? currentRestaurant.city
                  : ""
              }
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {modalType === ModalType.Add ? "Add restaurant" : "Edit restaurant"}
        </Button>
        {error && (
          <Typography component="h1" variant="h5" color="error">
            {error}
          </Typography>
        )}
      </Box>
    );
  };

  const modalContent =
    modalType === ModalType.Remove ? removeContent : modalForm(modalType);

  return (
    <Box>
      <Button
        sx={{ float: "right", mt: 2, mr: 10 }}
        variant="contained"
        onClick={() => handleModalOpen(ModalType.Add)}
      >
        Add New Restaurant
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ width: 800, margin: "0 auto" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.map(({ name, type, city, id }) => (
              <TableRow
                key={name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{type}</TableCell>
                <TableCell align="right">{city}</TableCell>
                <TableCell align="right">
                  <ButtonGroup variant="outlined">
                    <Button onClick={() => handleModalOpen(ModalType.Edit, id)}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleModalOpen(ModalType.Remove, id)}
                      color="error"
                    >
                      Remove
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            pt: 2,
            px: 4,
            pb: 3,
          }}
          className="restaurants_item__modal"
        >
          <Typography sx={{ textAlign: "center", width: "100%" }} variant="h5">
            <b>
              {modalType} {currentRestaurant?.name ?? "new restaurant"}
            </b>
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {modalContent}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
export default ManageRestaurants;
