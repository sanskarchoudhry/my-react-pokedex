"use client";

import {
  effectivenessMultiplier,
  PokemonType,
  typeDefenses,
  types,
} from "@/constants/pokemonType";
import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import { fetchPokemonData } from "@/services/api/server/pokemonService";
import { getTypeEffectiveness } from "@/utils/getTypeEffectiveness";
import { useEffect, useState } from "react";

export function PokemonTypeDefenses() {
  const { pokemonForm } = usePokemonDetails();
  const [typeEffectiveness, setTypeEffectiveness] =
    useState<Record<PokemonType, number>>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPokemonData(pokemonForm);
      setTypeEffectiveness(getTypeEffectiveness(data.types, typeDefenses));
    }

    fetchData();
  }, [pokemonForm]);

  return (
    <section className="py-2">
      <h1 className="font-bold text-3xl capitalize text-center mb-6 text-gray-800">
        Type Defenses
      </h1>
      {typeEffectiveness && (
        <ul className="grid grid-cols-9 gap-0.5">
          {Object.entries(typeEffectiveness).map(([type, multiplier]) => {
            const bgColor = types[type as PokemonType].bgColor;
            return (
              <li key={type} className="flex flex-col gap-0.5">
                <div
                  style={{ backgroundColor: bgColor }}
                  className="uppercase py-2 px-1 flex items-center justify-center text-white-primary rounded-[4px] font-semibold text-sm"
                >
                  {type.slice(0, 3)}
                </div>
                <div
                  className="flex items-center justify-center text-[#ffcc00] py-2 rounded-[4px] text-sm"
                  style={{
                    backgroundColor:
                      effectivenessMultiplier[multiplier].bgColor,
                  }}
                >
                  {effectivenessMultiplier[multiplier].value}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
