import { QueryClient } from "@tanstack/react-query";
import getCurrentUserData from "./api/getUserdata";

export const queryClient = new QueryClient();

export const prefetchUserData = async () => {
  if (!queryClient.getQueryData(["userData"])) {
    await queryClient.prefetchQuery(["userData"], getCurrentUserData);
  }
  return true;
};
