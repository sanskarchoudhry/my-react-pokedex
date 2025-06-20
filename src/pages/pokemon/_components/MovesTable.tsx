import { MoveDetails } from "../../../utils/flattenPokemonMovesArray";
import TableRow from "../../../components/TableRow";

export default function MovesTable({
  pokeMoves,
}: {
  pokeMoves: MoveDetails[];
}) {
  return (
    <div className="overflow-x-auto mt-4 rounded-[8px]">
      <table className=" divide-y divide-gray-200 text-sm text-left rounded-[8px] border border-gray-200">
        <thead className="bg-light-grey uppercase text-xs font-semibold text-gray-700">
          <tr>
            <th className="px-2 py-2">Lv</th>
            <th className="px-2 py-2">Move</th>
            <th className="px-2 py-2">Type</th>
            <th className="px-2 py-2">Category</th>
            <th className="px-2 py-2">Power</th>
            <th className="px-2 py-2">Accuracy</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {pokeMoves &&
            pokeMoves
              .filter((move) => move.learnedMethod.name === "level-up")
              .map((move, index) => (
                <TableRow
                  key={index}
                  moveUrl={move.move.url}
                  levelLearnedAt={move.levelLearnedAt}
                />
              ))}
        </tbody>
      </table>
    </div>
  );
}
