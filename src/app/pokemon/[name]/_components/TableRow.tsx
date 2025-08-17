import { types } from "@/constants/pokemonType";
import { fetchMoveData, MoveData } from "@/services/api/server/moveService";

import { getIdFromUrl } from "@/utils/getIdFromUrl";
import { formatName } from "@/utils/nameFormatter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TableRow({
  moveUrl,
  levelLearnedAt,
}: {
  moveUrl: string;
  levelLearnedAt?: number;
}) {
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    (async () => {
      const data = await fetchMoveData(getIdFromUrl(moveUrl));
      setMoveData(data);
    })();
  }, [moveUrl]);

  if (!moveData) return null;

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {levelLearnedAt && <td className="p-2">{levelLearnedAt}</td>}
      <td className="p-2 capitalize text-link-blue hover:underline">
        <a href={`/move/${moveData.name}`}>{formatName(moveData.name)}</a>{" "}
      </td>
      <td className="p-2 capitalize">
        <span
          className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
          style={{ backgroundColor: types[moveData.type.name]?.bgColor }}
        >
          {moveData.type.name}
        </span>
      </td>
      <td className="p-2 capitalize">
        <Image
          src={`https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png`}
          alt={moveData.damage_class.name}
          className="h-5 w-auto"
          width={16}
          height={11}
        />
      </td>
      <td className="p-2">{moveData.power ?? "-"}</td>
      <td className="p-2">{moveData.accuracy ?? "-"}</td>
    </tr>
  );
}
