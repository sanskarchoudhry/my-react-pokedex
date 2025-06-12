import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../services/api";
import { PokemonData } from "../../../services/api/pokemonService";
import { formatPokemonName } from "../../../utils";
import { PokemonType, Type, types } from "../../../constants/pokemonType";
import { dexNumberFormatter } from "../../../utils/dexNumberFormatter";

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
          className=" flex flex-col justify-center items-center w-32 h-56 border-slate-700 capitalize"
        >
          <a href={`/pokemon/${pokemonData?.name}`}>
            <img
              src={
                pokemonData?.sprites?.other?.["official-artwork"]?.front_default
              }
              alt={`${pokemonData.name} image`}
              className="h-24 w-24 cursor-pointer"
            />
          </a>
          <div className=" text-gray-primary opacity-70">
            {dexNumberFormatter(pokemonData?.id)}
          </div>
          <a
            href={`/pokemon/${pokemonData?.name}`}
            className="font-semibold text-gray-primary opacity-90 hover:underline hover:text-link-blue"
          >
            {formatPokemonName(pokemonData?.name)}
          </a>
          <div className="flex gap-2">
            {pokemonData?.types?.map((type: Type, index) => {
              const pokemonType = type?.type?.name as PokemonType;
              const textColor = types[pokemonType]?.bgColor || "gray-500";

              return (
                <div
                  key={index}
                  className={`py-0.5 text-center font-medium capitalize rounded-md hover:underline cursor-pointer`}
                  style={{ color: textColor }}
                >
                  {type?.type?.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
