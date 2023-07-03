import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const prefetchUserData = async () => {
  if (!queryClient.getQueryData(["userData"])) {
    await queryClient.prefetchQuery(
      ["userData"],
      () =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              name: "John Doe",
              date: new Date().toISOString(),
            });
          }, 1000);
        })
    );
  }
  return true;
};
