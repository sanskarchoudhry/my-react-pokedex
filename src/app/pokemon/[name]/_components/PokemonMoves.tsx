"use client";

import { generations, VersionGroup } from "@/constants/generations";
import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import {
  fetchPokemonData,
  PokemonMove,
} from "@/services/api/server/pokemonService";
import { flattenedPokemonMove, MoveDetails } from "@/utils/flattenMoveData";
import { useEffect, useState } from "react";
import MovesTable from "./MovesTable";
import GenerationSelector from "./GenerationSelector";

export default function PokemonMoves() {
  const { speciesData, pokemonForm, pokemonData } = usePokemonDetails();
  const [pokemonMovesData, setPokemonMovesData] = useState<PokemonMove[]>();
  const [generation, setGeneration] = useState<string>("9");
  const [versionGroups, setVersionGroups] = useState<
    (typeof generations)[number]["versionGroups"]
  >(generations[8].versionGroups);
  const [selectedVersionGroup, setSelectedVersionGroup] =
    useState<VersionGroup>(generations[8].versionGroups[0]);

  const getFormName = (form: string) => {
    const parts = form.split("-");
    return parts[parts.length - 1];
  };

  const formName = getFormName(pokemonForm);
  const isDifferentForm = ["galar", "paldea", "alola"].includes(formName);

  useEffect(() => {
    if (isDifferentForm) {
      (async () => {
        const data = await fetchPokemonData(pokemonForm);
        setPokemonMovesData(data.moves);
      })();
    } else {
      setPokemonMovesData(pokemonData.moves);
    }
  }, [pokemonForm, pokemonData, isDifferentForm]);

  // const filteredGenerations = generations.filter((gen) => {
  //   if (formName === "paldea") return gen.id === "9";
  //   if (formName === "alola") return Number(gen.id) >= 7;
  //   if (["galar", "hisui"].includes(formName)) return Number(gen.id) >= 8;
  //   return Number(gen.id) >= Number(getIdFromUrl(speciesData.generation.url));
  // });

  const flattenedMoves =
    pokemonMovesData &&
    flattenedPokemonMove(pokemonMovesData)[Number(generation) - 1][
      selectedVersionGroup
    ];

  const moveSections = [
    {
      title: "Moves learned by levelling up",
      description: "learns these moves while levelling up",
      filterFn: (m: MoveDetails) =>
        m.learnedMethod.name === "level-up" && m.levelLearnedAt !== 0,
      showLevel: true,
    },
    {
      title: "Moves learned on evolution",
      description:
        "learns the following moves when it evolves (regardless of level).",
      filterFn: (m: MoveDetails) =>
        m.learnedMethod.name === "level-up" && m.levelLearnedAt === 0,
      showLevel: false,
    },
    {
      title: "Egg moves",
      description: "learns the following moves via breeding or picnics",
      filterFn: (m: MoveDetails) => m.learnedMethod.name === "egg",
      showLevel: false,
    },
    {
      title: "Move tutor moves",
      description: "can be taught these attacks from move tutors",
      filterFn: (m: MoveDetails) => m.learnedMethod.name === "tutor",
      showLevel: false,
    },
    {
      title: "Moves learned by TM",
      description: "learns these moves using TMs",
      filterFn: (m: MoveDetails) => m.learnedMethod.name === "machine",
      showLevel: false,
      tmColumnLabel: "TM",
    },
  ];

  return (
    <section>
      <h1 className="font-bold text-3xl capitalize text-center mb-6 text-gray-800">
        Moves learned by {speciesData.name}
      </h1>

      {/* Generation Tabs */}
      <GenerationSelector
        generation={generation}
        setGeneration={setGeneration}
        setVersionGroups={setVersionGroups}
        setSelectedVersionGroup={setSelectedVersionGroup}
      />

      {/* Version Group Tabs */}
      <ul className="mt-2 flex gap-1">
        {versionGroups.map((group, index) => (
          <li
            key={index}
            className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
              group === selectedVersionGroup ? "bg-white" : "bg-light-grey"
            }`}
            onClick={() => setSelectedVersionGroup(group)}
          >
            {group}
          </li>
        ))}
      </ul>
      {!flattenedMoves && (
        <div className="mt-1 rounded-[8px] p-4 border border-gray-200 text-sm text-gray-700 bg-light-grey/30">
          <strong className="capitalize">{pokemonForm}</strong> doesnt learn any
          move in {selectedVersionGroup}
        </div>
      )}

      {/* Moves Tables */}
      {flattenedMoves && (
        <section className="flex gap-16">
          <div className="flex flex-col">
            {moveSections.slice(0, 4).map((section) => (
              <MovesTable
                key={section.title}
                title={section.title}
                description={section.description}
                pokeMoves={flattenedMoves as MoveDetails[]}
                filterFn={section.filterFn}
                showLevel={section.showLevel}
                pokeName={pokemonForm}
              />
            ))}
          </div>

          <div className="flex flex-col">
            <MovesTable
              title={moveSections[4].title}
              description={moveSections[4].description}
              pokeMoves={flattenedMoves as MoveDetails[]}
              filterFn={moveSections[4].filterFn}
              showLevel={false}
              tmColumnLabel={moveSections[4].tmColumnLabel}
              pokeName={pokemonForm}
            />
          </div>
        </section>
      )}
      {flattenedMoves && (
        <GenerationSelector
          generation={generation}
          setGeneration={setGeneration}
          setVersionGroups={setVersionGroups}
          setSelectedVersionGroup={setSelectedVersionGroup}
        />
      )}
    </section>
  );
}
