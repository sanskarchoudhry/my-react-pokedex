"use client";

import { usePokemonDetails } from "@/context/PokemonDetailsContext";
import {
  fetchPokemonData,
  PokemonData,
} from "@/services/api/server/pokemonService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokemonInfo } from "./PokemonInfo";

export default function PokemonForms() {
  const { speciesData, pokemonForm, setPokemonForm } = usePokemonDetails();
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchPokemonData(pokemonForm);
      setPokemonData(data);
    }

    fetchData();
  }, [pokemonForm]);

  return (
    <section>
      <div className="flex list-none gap-1">
        {speciesData?.varieties.length > 1 &&
          speciesData?.varieties.map((form, index) => {
            return (
              <li
                onClick={() => {
                  setPokemonForm(form.pokemon.name);
                }}
                key={index}
                className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
                  form.pokemon.name === pokemonForm
                    ? "bg-white"
                    : "bg-light-grey"
                } `}
              >
                {form.pokemon.name}
              </li>
            );
          })}
      </div>
      {pokemonData && (
        <section className="flex gap-4 mt-8">
          {/* {pokemonData?.sprites.other["official-artwork"].front_default ? ( */}
          <Image
            src={
              pokemonData?.sprites.other["official-artwork"].front_default ??
              "/file.svg"
            }
            alt={
              pokemonData?.sprites.other["official-artwork"].front_default ??
              `${pokemonData.name} image not available`
            }
            height={475}
            width={475}
            className={
              pokemonData?.sprites.other["official-artwork"].front_default
                ? "w-96 h-96"
                : "w-72 h-72"
            }
          />
          {/* ) : ( */}
          {/* <div className="h-24 w-24 cursor-pointer flex flex-col gap-2 items-center justify-center">
              <Image
                src={"/file.svg"}
                alt={`${pokemonData.name} image not available`}
                height={50}
                width={50}
                className="w-96 h-96"
              />
              <figure>
                <strong className="text-gray-primary">No Image</strong>
              </figure>
            </div> */}
          {/* )} */}

          <PokemonInfo speciesData={speciesData} pokemonData={pokemonData} />
        </section>
      )}
    </section>
  );
}
