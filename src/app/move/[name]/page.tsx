import { types } from "@/constants/pokemonType";
import { fetchMoveData } from "@/services/api/server/moveService";
import React from "react";
import GameDescriptionSection from "./_components/GameDescriptionSection";
import PokemonListGrid from "@/components/PokemonListGrid";
import Image from "next/image";
import { fetchPokemonData } from "@/services/api/server/pokemonService";

export default async function MovePage({
  params,
}: {
  params: Promise<{
    name: string;
  }>;
}) {
  const { name: moveName } = await params;

  const moveData = await fetchMoveData(moveName);

  const learnedByPokemon = await Promise.all(
    moveData.learned_by_pokemon.map((pokemon) => fetchPokemonData(pokemon.name))
  );

  // Step 2: Filter by version_group_details with method === 'level-up'
  const levelUpPokemon = learnedByPokemon.filter((pokemon) =>
    pokemon.moves.some(
      (move) =>
        move.move.name === moveName &&
        move.version_group_details.some(
          (vg) => vg.move_learn_method.name === "level-up"
        )
    )
  );

  console.log(levelUpPokemon);

  return (
    <section>
      <header className="mb-6">
        <h1 className="font-bold text-4xl text-gray-primary capitalize text-center">
          {moveData.name}
        </h1>
      </header>

      <section className="flex">
        <section className="w-[25%] p-4" aria-labelledby="move-data-heading">
          <h2
            id="move-data-heading"
            className="text-3xl font-bold text-center text-gray-primary mb-4"
          >
            Move Data
          </h2>

          <dl className="flex flex-col gap-3 text-sm text-gray-primary">
            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                Type
              </dt>
              <dd className="w-1/2 pl-4">
                <span
                  className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
                  style={{
                    backgroundColor: types[moveData.type.name]?.bgColor,
                  }}
                >
                  {moveData.type.name}
                </span>
              </dd>
            </div>

            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                Category
              </dt>
              <dd className="w-1/2 pl-4 capitalize flex items-center gap-0.5">
                <Image
                  src={`https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png`}
                  alt={moveData.damage_class.name}
                  className="h-4 w-auto"
                  width={16}
                  height={11}
                />
                {moveData.damage_class.name}
              </dd>
            </div>

            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                Power
              </dt>
              <dd className="w-1/2 pl-4">{moveData.power ?? "-"}</dd>
            </div>

            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                Accuracy
              </dt>
              <dd className="w-1/2 pl-4">{moveData.accuracy ?? "-"}</dd>
            </div>

            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                PP
              </dt>
              <dd className="w-1/2 pl-4">{moveData.pp}</dd>
            </div>

            <div className="flex justify-between border-b border-gray-primary/20 pb-1">
              <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                Introduced
              </dt>
              <dd className="w-1/2 pl-4 capitalize">
                {moveData.generation.name}
              </dd>
            </div>
          </dl>
        </section>

        <section className="p-4 w-[75%]" aria-labelledby="effect-heading">
          <h2
            id="effect-heading"
            className="text-3xl font-bold text-gray-primary"
          >
            Effects
          </h2>
          <p className="text-gray-primary/90 leading-7 mt-4">
            {moveData.effect_entries[0].effect}
          </p>
        </section>
      </section>

      <section>
        <h2
          id="learned-by-pokemon-heading"
          className="text-3xl font-bold text-center text-gray-primary mb-4"
        >
          Learned by Pokemon
        </h2>
        <PokemonListGrid pokemonList={moveData.learned_by_pokemon} />
      </section>

      <GameDescriptionSection gameDescription={moveData.flavor_text_entries} />
    </section>
  );
}
