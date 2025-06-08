import { v4 as uuidv4 } from "uuid";

export type NavItem = {
  itemName: string;
  itemUrl: string;
  itemId: string;
};

export const navItems: NavItem[] = [
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
];
