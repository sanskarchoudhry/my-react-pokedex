"use client";

import TypeStyle from "@/components/TypeStyle";
import { MoveData } from "@/services/api/server/moveService";
import Image from "next/image";
import Link from "next/link";

export default function MovesListTable({
  moveListData,
}: {
  moveListData: MoveData[];
}) {

  return (
    <section className="w-full mt-4">
      
      <table className="w-full">
        <thead className="bg-light-grey p-2">
          <tr className="p-4 border-y border-y-gray-primary/20">
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Name</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Type</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Category</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Power</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Accuracy</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">PP</th>
            <th className="px-4 py-2 border-r border-r-gray-primary/15">Effect</th>
          </tr>
        </thead>
        <tbody>
          {moveListData.map((move) => {
            return (
              <tr
                key={move.id}
                className="hover:bg-gray-50 transition-colors duration-150 text-gray-dark border-b-[0.5px] border-b-gray-primary/10"
              >
                <td className="px-4 py-2 capitalize text-link-blue hover:underline font-semibold cursor-pointer">
                  <Link href={`/move/${move.name}`}>{move.name}</Link>
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