// hooks/usePokemonDetails.ts
import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  fetchPokemonSpeciesData,
  PokemonData,
  PokemonSpeciesData,
} from "../services/api/pokemonService";

export function usePokemonDetails(id: string) {
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [speciesData, setSpeciesData] = useState<PokemonSpeciesData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [pokemon, species] = await Promise.all([
          fetchPokemonData(id),
          fetchPokemonSpeciesData(id),
        ]);
        setPokemonData(pokemon);
        if (species) setSpeciesData(species);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { pokemonData, speciesData, loading, error };
}
