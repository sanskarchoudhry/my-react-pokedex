import React, { useEffect, useState } from "react";
import { axiosClient } from "../services/api";
import { PokemonData } from "../services/api/pokemonService";
import { formatPokemonName } from "../utils";
import { PokemonType, Type, types } from "../constants/pokemonType";

export default function PokemonCard({ url }: { url: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();

  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axiosClient.get(url);
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    fetchPokemonData();
  }, [url]);

  return (
    <div className="">
      {pokemonData && (
        <div
          key={pokemonData.id}
          className=" w-40 h-56 border-slate-700 border rounded-[12px] capitalize cursor-pointer"
        >
          {pokemonData?.id}
          <a href={`/pokemon/${pokemonData?.name}`}>
            <img
              src={
                pokemonData?.sprites?.other?.["official-artwork"]?.front_default
              }
              alt={`${pokemonData.name} image`}
              className="h-24 w-24"
            />
          </a>

          <div className="flex gap-4">
            {pokemonData?.types?.map((type: Type, index) => {
              const pokemonType = type?.type?.name as PokemonType;
              const bgColor = types[pokemonType]?.bgColor || "gray-500";

              return (
                <div
                  key={index}
                  className="px-1 py-0.5 uppercase rounded-md"
                  style={{ backgroundColor: bgColor }}
                >
                  {type?.type?.name}
                </div>
              );
            })}
          </div>

          {formatPokemonName(pokemonData?.name)}
        </div>
      )}
    </div>
  );
}
