"use client";

import { generations } from "@/constants/generations";
import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import { getIdFromUrl } from "@/utils/getIdFromUrl";
import { Dispatch, SetStateAction } from "react";

type Props = {
  generation: string;
  setGeneration: Dispatch<SetStateAction<string>>;
  setVersionGroups: Dispatch<
    SetStateAction<(typeof generations)[number]["versionGroups"]>
  >;
  setSelectedVersionGroup: Dispatch<
    SetStateAction<(typeof generations)[number]["versionGroups"][number]>
  >;
};

export default function GenerationSelector({
  generation,
  setGeneration,
  setVersionGroups,
  setSelectedVersionGroup,
}: Props) {
  const { speciesData, pokemonForm } = usePokemonDetails();

  const formName = pokemonForm.split("-").slice(-1)[0];

  const shouldInclude = (genId: string) => {
    if (formName === "paldea") return genId === "9";
    if (formName === "alola") return Number(genId) >= 7;
    if (["galar", "hisui"].includes(formName)) return Number(genId) >= 8;
    return Number(genId) >= Number(getIdFromUrl(speciesData.generation.url));
  };

  return (
    <div className="flex flex-row justify-center gap-16 items-center bg-link-blue/10 p-5 rounded-[4px] mt-8">
      <h3 className="text-gray-dark text-lg font-semibold">
        For other generations:
      </h3>
      <ul className="flex gap-2">
        {generations
          .filter((gen) => shouldInclude(gen.id))
          .map((gen, index) => (
            <li
              key={gen.id}
              className={`${
                gen.id === generation
                  ? "text-visited-link-red underline font-semibold"
                  : "text-link-blue"
              } cursor-pointer hover:font-semibold hover:underline select-none pr-2 ${
                index !== generations.length - 1
                  ? "border-r border-r-link-blue/40"
                  : ""
              }`}
              onClick={() => {
                setGeneration(gen.id);
                setVersionGroups(gen.versionGroups);
                setSelectedVersionGroup(gen.versionGroups[0]);
              }}
            >
              {gen.id}
            </li>
          ))}
      </ul>
    </div>
  );
}
