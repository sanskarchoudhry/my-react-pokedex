"use client";
import TypeStyle from "@/components/TypeStyle";
import { PokemonType, types } from "@/constants/pokemonType";
import { MinifiedPokemon } from "@/services/api/server/pokemonService"; // Updated import
import { dexNumberFormatter } from "@/utils/dexNumberFormatter";
import Image from "next/image";
import React, { useState, useMemo } from "react";

export default function PokemonList({
  pokemonListData,
}: {
  pokemonListData: MinifiedPokemon[];
}) {
  const [inputName, setInputName] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [displayLimit, setDisplayLimit] = useState(50); // Pagination/Virtualization limit

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
    setDisplayLimit(50); // Reset limit on search
  };

  const handleTypeDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setDisplayLimit(50); // Reset limit on filter
  };

  // Memoize the filtering so it doesn't run on every small re-render
  const filteredPokemon = useMemo(() => {
    return pokemonListData.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(inputName.toLowerCase());
      const matchesType = selectedType === "" || pokemon.types.includes(selectedType as PokemonType);
      return matchesName && matchesType;
    });
  }, [pokemonListData, inputName, selectedType]);

  const visiblePokemon = filteredPokemon.slice(0, displayLimit);

  return (
    <section className="w-full mt-4">
      {/* Filters Section (Same as before) */}
      <div className="flex flex-wrap items-center gap-6 mb-4">
        {/* ... Inputs remain the same ... */}
        <div className="flex flex-col">
          <label htmlFor="filterName" className="mb-1 text-sm font-medium text-gray-dark">
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
          <label htmlFor="typeDropdown" className="mb-1 text-sm font-medium text-gray-dark">
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
           {/* ... Header remains the same ... */}
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
          {visiblePokemon.map((pokemon) => {
            return (
              <tr key={pokemon.id} className="border-b border-b-gray-primary/15">
                <td className="flex gap-3 items-center justify-center">
                  <Image
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    width={50}
                    height={50}
                    loading="lazy"
                  />
                  <span className="font-semibold text-gray-dark">
                    {dexNumberFormatter(pokemon.id).slice(1)}{" "}
                  </span>
                </td>
                <td className="capitalize text-center font-semibold text-gray-dark hover:text-link-blue hover:underline">
                  <a href={`/pokemon/${pokemon.name}`}>
                    {pokemon.name}
                  </a>
                </td>
                <td className="text-center">
                   {/* Simplified Type Rendering based on DTO */}
                  {pokemon.types.map((type, index) => (
                    <span key={index} className="inline-block m-0.5">
                         <TypeStyle type={type} />
                    </span>
                  ))}
                </td>
                {pokemon.stats.map((stat, index) => (
                  <td key={index} className="text-center font-semibold text-gray-dark">
                    {stat.value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {/* "Load More" to prevent DOM bloat */}
      {visiblePokemon.length < filteredPokemon.length && (
          <div className="flex justify-center mt-4 mb-8">
              <button 
                  onClick={() => setDisplayLimit((prev) => prev + 50)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                  Load More
              </button>
          </div>
      )}
    </section>
  );
}