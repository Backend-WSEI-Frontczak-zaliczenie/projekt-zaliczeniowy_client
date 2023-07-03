import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import { prefetchUserData } from "./utils/queryClient";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />} loader={prefetchUserData}>
      <Route path="/" element={<Navigate to="/restaurants" />} />
      <Route path="restaurants" element={<RestaurantsList />} />
      <Route path="reservations" element={<>Reservations</>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
