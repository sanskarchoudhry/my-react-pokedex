import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../../../services/api/moveService";
import { types } from "../../../constants/pokemonType";
import { getIdFromUrl } from "../../../utils";

export default function TableRow({
  moveUrl,
  levelLearnedAt,
}: {
  moveUrl: string;
  levelLearnedAt?: number;
}) {
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMoveData(getIdFromUrl(moveUrl));
      setMoveData(data);
    }
    fetchData();
  }, [moveUrl]);

  if (!moveData) return null;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {levelLearnedAt && <td className="p-2">{levelLearnedAt}</td>}
      <td className="p-2 capitalize">{moveData.name} </td>
      <td className="p-2 capitalize">
        <span
          className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
          style={{ backgroundColor: types[moveData.type.name]?.bgColor }}
        >
          {moveData.type.name}
        </span>
      </td>
      <td className="p-2 capitalize">
        <img
          src={`https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png`}
          alt={moveData.damage_class.name}
          className="h-5"
        />
      </td>
      <td className="p-2">{moveData.power ?? "-"}</td>
      <td className="p-2">{moveData.accuracy ?? "-"}</td>
    </tr>
  );
}
