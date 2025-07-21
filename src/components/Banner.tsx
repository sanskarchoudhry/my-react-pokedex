import React from "react";
import NavMenuItems from "./NavMenuItems";

function Banner() {
  return (
    <header className="flex w-full h-32 bg-pokedex-red-primary relative">
      <NavMenuItems />
    </header>
  );
}

export default Banner;
