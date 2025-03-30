import React from "react";
import { Generation, generations } from "../constants/generations";

export default function GenerationList({
  generationID,
  handleGeneration,
}: {
  generationID: string;
  handleGeneration: (generationID: string) => void;
}) {
  return (
    <header>
      <nav>
        <ul className=" flex flex-row gap-8">
          {generations.map((generation: Generation) => (
            <li
              className={`${
                generation.id === generationID && "text-blue-600"
              } user-select-none cursor-pointer`}
              key={generation.id}
              onClick={() => {
                handleGeneration(generation.id);
              }}
            >
              {generation.title}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
