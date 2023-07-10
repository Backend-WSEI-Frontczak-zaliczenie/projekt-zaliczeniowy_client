export interface RestaurantItem {
  name: string;
  type: string;
  city: string;
  region: string;
  rating: number;
  image: string;
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
