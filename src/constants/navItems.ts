export type NavItem = {
  itemName: string;
  itemUrl: string;
  itemId: string;
};

export const navItems: NavItem[] = [
  {
    itemName: "home",
    itemUrl: "/",
    itemId: "1",
  },
  {
    itemName: "pokemon data",
    itemUrl: "/pokemon",
    itemId: "2",
  },
  {
    itemName: "community",
    itemUrl: "/community",
    itemId: "3",
  },
];
