import { v4 as uuidv4 } from "uuid";

export const navItems = [
  {
    itemName: "home",
    itemUrl: "/",
    itemId: uuidv4(),
  },
  {
    itemName: "pokemon data",
    itemUrl: "/pokemon",
    itemId: uuidv4(),
  },
  {
    itemName: "community",
    itemUrl: "/community",
    itemId: uuidv4(),
  },
] as const;

export type NavItem = (typeof navItems)[number];
