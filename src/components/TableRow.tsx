import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../services/api/moveService";
import { types } from "../constants/pokemonType";

export default function TableRow({
  moveUrl,
  levelLearnedAt,
}: {
  moveUrl: string;
  levelLearnedAt: number;
}) {
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMoveData(moveUrl);
      setMoveData(data);
    }
    fetchData();
  }, [moveUrl]);

  if (!moveData) return null;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="p-2">{levelLearnedAt}</td>
      <td className="p-2 capitalize">{moveData.name} </td>
      <td className="p-2 capitalize">
        <span
          className={`text-white px-1 py-0.5 rounded-[4px]`}
          style={{ backgroundColor: types[moveData.type.name]?.bgColor }}
        >
          {moveData.type.name}
        </span>
      </td>
      <td className="p-2 capitalize">{moveData.damage_class.name}</td>
      <td className="p-2">{moveData.power ?? "-"}</td>
      <td className="p-2">{moveData.accuracy ?? "-"}</td>
    </tr>
  );
}
