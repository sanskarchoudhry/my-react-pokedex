import { fetchMoveData, fetchMoveList } from "@/services/api/server/moveService";
import MoveListContainer from "./_components/MoveListContainer";

export default async function PokemonMoveRootPage() {
  // 1. Fetch ALL names (The "Index")
  const allMoveNames = await fetchMoveList(1000, 0);

  // 2. Fetch details for just the first 20 (For SEO / Initial Render)
  // This keeps the initial HTML payload small.
  const initialMoves = await Promise.all(
    allMoveNames.slice(0, 20).map((move) => fetchMoveData(move.name))
  );

  return (
    <section>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-primary mb-2">All Moves</h1>
      </header>

      {/* Pass the Master List and the Initial Details */}
      <MoveListContainer 
        allMoveNames={allMoveNames} 
        initialDetails={initialMoves} 
      />
    </section>
  );
}