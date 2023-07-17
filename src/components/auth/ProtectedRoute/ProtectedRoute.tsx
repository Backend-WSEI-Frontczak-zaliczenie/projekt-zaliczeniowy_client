import { useQuery } from "@tanstack/react-query";
import getCurrentUserData from "../../../utils/api/getUserdata";
import { Navigate, Outlet } from "react-router-dom";
import { Roles } from "../../../types/types";

const ProtectedRoute = ({ role }: { role: Roles }) => {
  const { data: user } = useQuery(["userData"], getCurrentUserData, {
    staleTime: Infinity,
  });

  if (!user || !user.userName) {
    if (role === Roles.NotLogged) return <Outlet />;
    return <Navigate to="/login" />;
  }

  if (!user.roles.some((r) => role.includes(r)))
    return <Navigate to="/restaurants" />;

  return <Outlet />;
};

export default ProtectedRoute;
