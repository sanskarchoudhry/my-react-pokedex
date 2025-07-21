"use client";

import {
  PokemonData,
  PokemonSpeciesData,
} from "@/services/api/server/pokemonService";
import { PokemonDetailsProvider } from "@/context/PokemonDetailsContext";
import { useState } from "react";

export default function PokemonDetailsWrapper({
  pokemonData,
  speciesData,
  children,
}: {
  pokemonData: PokemonData;
  speciesData: PokemonSpeciesData;
  children: React.ReactNode;
}) {
  const [pokemonForm, setPokemonForm] = useState<string>(
    speciesData.varieties[0].pokemon.name
  );

  return (
    <PokemonDetailsProvider
      pokemonData={pokemonData}
      speciesData={speciesData}
      pokemonForm={pokemonForm}
      setPokemonForm={setPokemonForm}
    >
      <section className="flex flex-col gap-4">{children}</section>
    </PokemonDetailsProvider>
  );
}
