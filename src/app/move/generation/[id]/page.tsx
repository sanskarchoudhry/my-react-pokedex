import { fetchGenerationData } from "@/services/api/server/generationService";
import GenerationSelector from "./_components/GenerationSelector";
import { fetchMoveData } from "@/services/api/server/moveService";
import MovesListTable from "../../_components/MovesListTable";

export default async function MoveGenerationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const moveList = await fetchGenerationData(id);
  const moveListData = await Promise.all(
    moveList.moves.map(async (move) => await fetchMoveData(move.name))
  );

  return (
    <section>
      <GenerationSelector genID={id} />
      <MovesListTable moveListData={moveListData} />
    </section>
  );
}
