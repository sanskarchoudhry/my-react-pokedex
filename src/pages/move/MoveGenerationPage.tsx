import { useEffect, useState } from "react";
import ContainerWrapper from "../../components/ContainerWrapper";
import { NameUrl } from "../../types";
import { fetchGenerationData } from "../../services/api/generationService";
import { useParams } from "react-router-dom";
import MoveTable from "./components/MoveTable";

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
        <section className="p-8 pt-16 bg-white w-[75%]">
          <MoveTable
            tableRows={[
              "Name",
              "Type",
              "Category",
              "Power",
              "Accuracy",
              "PP",
              "effect",
            ]}
            moveList={movesList}
          />
        </section>
      )}
    </ContainerWrapper>
  );
}

export default MoveGenerationPage;
