import React, { useEffect, useState } from "react";
import { NavItem, navItems } from "../constants/navItems";

function NavMenuItems() {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 125);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // fixed top-[6.8rem]
    <nav
      className={`bg-gray-primary flex h-12 w-4/6 rounded-[4px] shadow-[var(--drop-shadow-regular)] ${
        isSticky ? "fixed top-4 left-1/6" : "absolute left-1/6 top-[6.5rem]"
      }`}
    >
      <ul className=" flex flex-row items-center w-full">
        {navItems.map((item: NavItem) => {
          return (
            <li
              key={item.itemId}
              className="cursor-pointer h-full hover:bg-gray-dark flex items-center p-3 w-[8.5rem] justify-center"
            >
              <div className="text-white-primary capitalize font-bold">
                {item.itemName}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMenuItems;
