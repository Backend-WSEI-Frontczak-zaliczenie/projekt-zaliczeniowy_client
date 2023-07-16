import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout";
import RestaurantsList from "./components/RestaurantsList/RestaurantsList";
import SignIn from "./components/auth/SignIn/SignIn";
import SignUp from "./components/auth/SignUp/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute/ProtectedRoute";
import { logout } from "./utils/api/logout";
import { Roles } from "./types/types";
import ManageRestaurants from "./components/AdminPanel/ManageRestaurants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Navigate to="/restaurants" />} />
      <Route path="restaurants" element={<RestaurantsList />} />

      <Route element={<ProtectedRoute role={Roles.Admin} />}>
        <Route path="manage-restaurants" element={<ManageRestaurants />} />
      </Route>

      <Route element={<ProtectedRoute role={Roles.NotLogged} />}>
        <Route path="login" element={<SignIn />} />
        <Route path="register" element={<SignUp />} />
      </Route>

      <Route path="logout" loader={logout} element={<Navigate to="/" />} />

      <Route path="*" element={<>Not Found</>} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
