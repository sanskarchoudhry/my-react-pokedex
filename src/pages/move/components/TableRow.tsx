import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../../../services/api/moveService";
import { types } from "../../../constants/pokemonType";

export default function TableRow({ moveName }: { moveName: string }) {
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMoveData(moveName);
      setMoveData(data);
    }
    fetchData();
  }, [moveName]);

  if (!moveData) return null;

  // Color badge: use gray–blue, can vary

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 text-gray-dark border-b-[0.5px] border-b-gray-primary/10">
      <td className="px-4 py-2 capitalize text-link-blue hover:underline font-semibold cursor-pointer">
        <a href={`/move/${moveData.name}`}>{moveData.name}</a>
      </td>
      <td className="px-4 py-2">
        <span
          className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
          style={{ backgroundColor: types[moveData.type.name]?.bgColor }}
        >
          {moveData.type.name}
        </span>
      </td>
      <td className="px-4 py-2 capitalize">
        <img
          src={`https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png`}
          alt={moveData.damage_class.name}
          className="h-5"
        />
      </td>
      <td className="px-4 py-2 text-center">{moveData.power ?? "-"}</td>
      <td className="px-4 py-2 text-center">{moveData.accuracy ?? "-"}</td>
      <td className="px-4 py-2 text-center">{moveData.pp}</td>
      <td className="px-4 py-2">
        {moveData.effect_entries[0]?.short_effect ?? "-"}
      </td>
    </tr>
  );
}
