import React from "react";
import { Generation, generations } from "../constants/generations";

export default function GenerationSidebar() {
  return (
    <nav className="flex rounded-[4px] fixed top-[10rem] left-10 z-50 shadow-[var(--drop-shadow-regular)] bg-gray-primary">
      <ul className=" flex flex-col">
        {generations.map((generation: Generation) => (
          <li
            className={` user-select-none cursor-pointer rounded-t-[4px] p-2 h-12  text-white-primary flex items-center justify-center hover:bg-gray-dark  font-semibold`}
            key={generation.id}
          >
            {generation.title}
          </li>
        ))}
      </ul>
    </nav>
  );
}
