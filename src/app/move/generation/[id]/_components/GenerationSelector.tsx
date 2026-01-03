import { generations } from "@/constants/generations";
import Link from "next/link";
import React from "react";

export default function GenerationSelector({ genID }: { genID: string }) {
  return (
    <div className="flex flex-row justify-center gap-16 items-center bg-link-blue/10 p-5 rounded-sm mt-8">
      <h3 className="text-gray-dark text-lg font-semibold">
        For other generations:
      </h3>
      <ul className="flex gap-2">
        {generations.map((gen, index) => {
          return (
            <li
              key={gen.id}
              className={`${
                gen.id === genID
                  ? "text-visited-link-red underline font-semibold"
                  : "text-link-blue"
              } cursor-pointer hover:font-semibold hover:underline select-none pr-2 ${
                index !== generations.length - 1
                  ? "border-r border-r-link-blue/40"
                  : ""
              }`}
            >
              <Link href={`/move/generation/${gen.id}`}>{gen.id}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
