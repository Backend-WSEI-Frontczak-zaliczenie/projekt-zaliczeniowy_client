export interface RestaurantItem {
  id: number;
  name: string;
  type: string;
  city: string;
  rating: number;
}

export enum Roles {
  User = "user",
  Admin = "admin",
  NotLogged = "notLoggedIn",
}

export type User = {
  name: string | null;
  role: Roles;
};

export interface Review {
  id: number;
  restaurantId: number;
  textContent: string;
}

export type ReviewsStates = "write" | "read" | null;
