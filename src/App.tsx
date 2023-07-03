import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { prefetchUserData } from "./utils/queryClient";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />} loader={prefetchUserData}>
      <Route path="/" element={<Navigate to="/restaurants" />} />
      <Route path="restaurants" element={<>Restaurants</>} />
      <Route path="reservations" element={<>Reservations</>} />
      {/* <Route element={<AuthLayout />} path="/">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
