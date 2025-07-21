"use client";

import { createContext, Dispatch, SetStateAction, useContext } from "react";
import {
  PokemonData,
  PokemonSpeciesData,
} from "@/services/api/server/pokemonService";

type ContextType = {
  pokemonData: PokemonData;
  speciesData: PokemonSpeciesData;
  pokemonForm: string;
  setPokemonForm: Dispatch<SetStateAction<string>>;
};

const PokemonDetailsContext = createContext<ContextType | null>(null);

export const usePokemonDetails = () => {
  const context = useContext(PokemonDetailsContext);
  if (!context) {
    throw new Error(
      "usePokemonDetails must be used within a PokemonDetailsProvider"
    );
  }
  return context;
};

export const PokemonDetailsProvider = ({
  children,
  pokemonData,
  pokemonForm,
  speciesData,
  setPokemonForm,
}: {
  children: React.ReactNode;
  pokemonData: PokemonData;
  speciesData: PokemonSpeciesData;
  pokemonForm: string;
  setPokemonForm: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <PokemonDetailsContext.Provider
      value={{ pokemonData, speciesData, pokemonForm, setPokemonForm }}
    >
      {children}
    </PokemonDetailsContext.Provider>
  );
};
