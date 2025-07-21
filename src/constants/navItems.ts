<<<<<<< HEAD
=======
import { v4 as uuidv4 } from "uuid";

>>>>>>> main
export type NavItem = {
  itemName: string;
  itemUrl: string;
  itemId: string;
};

export const navItems: NavItem[] = [
  {
    itemName: "home",
    itemUrl: "/",
<<<<<<< HEAD
    itemId: "1",
=======
    itemId: uuidv4(),
>>>>>>> main
  },
  {
    itemName: "pokemon data",
    itemUrl: "/pokemon",
<<<<<<< HEAD
    itemId: "2",
=======
    itemId: uuidv4(),
>>>>>>> main
  },
  {
    itemName: "community",
    itemUrl: "/community",
<<<<<<< HEAD
    itemId: "3",
=======
    itemId: uuidv4(),
>>>>>>> main
  },
];
