"use client";

import TypeStyle from "@/components/TypeStyle";
import { PokemonType, types } from "@/constants/pokemonType";
import { MoveData } from "@/services/api/server/moveService";
import Image from "next/image";
import { useState } from "react";

// TODO: Sorting columns

export default function MovesListTable({
  moveListData,
}: {
  moveListData: MoveData[];
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
            placeholder="e.g., flamethrower"
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
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Name
            </th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Type
            </th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Category
            </th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Power
            </th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Accuracy
            </th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">PP</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">
              Effect
            </th>
          </tr>
        </thead>
        <tbody>
          {moveListData
            .filter((move) => move.name.startsWith(inputName.toLowerCase()))
            .filter((move) =>
              selectedType === "" ? true : move.type.name === selectedType
            )
            .map((move) => {
              return (
                <tr
                  key={move.id}
                  className="hover:bg-gray-50 transition-colors duration-150 text-gray-dark border-b-[0.5px] border-b-gray-primary/10"
                >
                  <td className="px-4 py-2 capitalize text-link-blue hover:underline font-semibold cursor-pointer">
                    <a href={`/move/${move.name}`}>{move.name}</a>
                  </td>
                  <td className="">
                    <TypeStyle type={move.type.name} />
                  </td>
                  <td className="px-4 py-2 capitalize">
                    <Image
                      src={`https://img.pokemondb.net/images/icons/move-${move.damage_class.name}.png`}
                      alt={move.damage_class.name}
                      className="h-5 w-auto"
                      width={16}
                      height={11}
                    />
                  </td>
                  <td className="text-center font-semibold px-4 py-2 text-gray-dark">
                    {move.power ?? "-"}
                  </td>
                  <td className="text-center font-semibold px-4 py-2 text-gray-dark">
                    {move.accuracy !== null
                      ? move.accuracy
                      : move.effect_entries[0]?.short_effect === "Never misses."
                      ? "∞"
                      : "-"}
                  </td>
                  <td className="text-center font-semibold px-4 py-2 text-gray-dark">
                    {move.pp}
                  </td>
                  <td className="px-4 py-2">
                    {move.effect_entries[0]?.short_effect ?? "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
}
