import { Roles, User } from "./types/types";

export const defaultUser: User = {
  userName: null,
  roles: [Roles.NotLogged],
};
