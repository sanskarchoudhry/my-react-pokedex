import { useEffect, useState } from "react";
import ContainerWrapper from "../../components/ContainerWrapper";
import { NameUrl } from "../../types";
import { fetchGenerationData } from "../../services/api/generationService";
import { useParams } from "react-router-dom";

function MoveGenerationPage() {
  const { genID } = useParams();
  const [movesList, setMovesList] = useState<NameUrl[]>();
  useEffect(() => {
    async function fetchData() {
      const data = await fetchGenerationData(genID);
      setMovesList(data.moves);
    }

    fetchData();
  }, [genID]);
  return (
    <ContainerWrapper>
      {movesList && (
        <section>
          {movesList.map((move: NameUrl, index) => {
            return <div key={index}>{move.name}</div>;
          })}
        </section>
      )}
    </ContainerWrapper>
  );
}

export default MoveGenerationPage;
