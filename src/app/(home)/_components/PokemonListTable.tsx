"use client";
import TypeStyle from "@/components/TypeStyle";
import { PokemonType, TypeInfo, types } from "@/constants/pokemonType";
import { PokemonData } from "@/services/api/server/pokemonService";
import { dexNumberFormatter } from "@/utils/dexNumberFormatter";
import { getFlattenedStats } from "@/utils/flattenStat";
import Image from "next/image";
import React, { useState } from "react";

// TODO: Sorting columns

export default function PokemonList({
  pokemonListData,
}: {
  pokemonListData: PokemonData[];
}) {
  const [inputName, setInputName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  const handleTypeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
  };

  return (
    <section className="w-full mt-4">
      <div className="flex flex-wrap items-center gap-6 mb-4">
        <div className="flex flex-col">
          <label
            htmlFor="filterName"
            className="mb-1 text-sm font-medium text-gray-dark"
          >
            Filter by Name
          </label>
          <input
            type="text"
            id="filterName"
            value={inputName}
            onChange={handleInputFilter}
            className="w-48 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-link-blue focus:border-transparent text-gray-dark"
            placeholder="e.g., pikachu"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="typeDropdown"
            className="mb-1 text-sm font-medium text-gray-dark"
          >
            Filter by Type
          </label>
          <select
            id="typeDropdown"
            value={selectedType}
            onChange={handleTypeDropdown}
            className="w-48 px-2 py-1 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-link-blue focus:border-transparent text-gray-dark capitalize"
          >
            <option value="">Select type</option>
            {(Object.keys(types) as PokemonType[]).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-light-grey p-2">
          <tr className="p-4 border-y border-y-gray-primary/20">
            <th className="py-2 border-r border-r-gray-primary/15">No</th>
            <th className="py-2 border-r border-r-gray-primary/15">Name</th>
            <th className="py-2 border-r border-r-gray-primary/15">Type</th>
            <th className="py-2 border-r border-r-gray-primary/15">HP</th>
            <th className="py-2 border-r border-r-gray-primary/15">Attack</th>
            <th className="py-2 border-r border-r-gray-primary/15">Defense</th>
            <th className="py-2 border-r border-r-gray-primary/15">Spl. Atk</th>
            <th className="py-2 border-r border-r-gray-primary/15">Spl.Def</th>
            <th className="py-2">Speed</th>
          </tr>
        </thead>
        <tbody>
          {pokemonListData
            .filter((pokemon) =>
              pokemon.name.startsWith(inputName.toLowerCase())
            )
            .filter((pokemon) =>
              selectedType === ""
                ? true
                : pokemon.types.some((t) => t.type.name === selectedType)
            )
            .map((pokemon) => {
              return (
                <tr
                  key={pokemon.id}
                  className="border-b border-b-gray-primary/15"
                >
                  <td className="flex gap-3 items-center justify-center">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      alt={pokemon.species.name}
                      width={50}
                      height={50}
                    />
                    <span className="font-semibold text-gray-dark">
                      {dexNumberFormatter(pokemon.id).slice(1)}{" "}
                    </span>
                  </td>
                  <td className="capitalize text-center font-semibold text-gray-dark hover:text-link-blue hover:underline">
                    <a href={`/pokemon/${pokemon.species.name}`}>
                      {pokemon.species.name}
                    </a>
                  </td>
                  <td className="">
                    {pokemon.types.map((type: TypeInfo, index) => {
                      return <TypeStyle key={index} type={type.type.name} />;
                    })}
                  </td>
                  {getFlattenedStats(pokemon.stats).map((type, index) => {
                    return (
                      <td
                        key={index}
                        className="text-center font-semibold text-gray-dark"
                      >
                        {type.value}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
