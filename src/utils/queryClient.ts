import { QueryClient } from "@tanstack/react-query";
import getCurrentUserData from "./api/getUserdata";
import { defaultUser } from "../constants";

export const queryClient = new QueryClient();

export const prefetchUserData = async () => {
  await queryClient.prefetchQuery(["userData"], getCurrentUserData);
};

export const clearUserData = () =>
  queryClient.setQueryData(["userData"], defaultUser);
