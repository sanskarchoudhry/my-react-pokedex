import { generations } from "@/constants/generations";
import React from "react";
import Link from "next/link";

export default function GenerationSideBar({ genID }: { genID: string }) {
  return (
    <nav className="flex rounded-[4px] fixed top-[10rem] left-10 z-50 shadow-[var(--drop-shadow-regular)] bg-gray-primary">
      <ul className="flex flex-col">
        {generations.map((generation) => {
          const isActive = generation.id === genID;

          return (
            <li
              key={generation.id}
              className={`select-none rounded-t-[4px] p-2 h-12 text-white-primary flex items-center justify-center font-semibold ${
                isActive
                  ? "bg-link-blue cursor-default"
                  : "hover:bg-gray-dark cursor-pointer"
              }`}
            >
              {isActive ? (
                <span className="pointer-events-none">{generation.title}</span>
              ) : (
                <Link href={`/pokemon/generation/${generation.id}`}>
                  {generation.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
