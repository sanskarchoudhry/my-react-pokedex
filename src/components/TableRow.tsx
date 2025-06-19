import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../services/api/moveService";

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
  });

  if (!moveData) {
    return;
  }
  return (
    <tr>
      <td>{levelLearnedAt}</td>
      <td>{moveData.name}</td>
      <td>{moveData.type.name}</td>
      <td>{moveData.damage_class.name}</td>
      <td>{moveData.accuracy}</td>
      <td>{moveData.power}</td>
    </tr>
  );
}
