export interface RestaurantItem {
  id: number;
  name: string;
  type: string;
  city: string;
  rating: number;
  adultOnly: boolean;
}

export enum Roles {
  User = "User",
  Admin = "Admin",
  NotLogged = "notLoggedIn",
}

export type User = {
  userName: string | null;
  roles: Roles[];
};

export interface Review {
  id: number;
  restaurantId: number;
  textContent: string;
}

export type ReviewsStates = "write" | "read" | null;
