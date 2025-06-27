import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../../services/api/moveService";
import { useParams } from "react-router-dom";

function MoveDetailsPage() {
  const { moveName } = useParams();
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMoveData(moveName);
      setMoveData(data);
    }

    fetchData();
  }, [moveName]);

  if (moveData) return <div>{moveData?.name}</div>;
}

export default MoveDetailsPage;
