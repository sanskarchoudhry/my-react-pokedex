import TableRow from "./TableRow";
import { MoveDetails } from "../../../utils/flattenPokemonMovesArray";
import { useParams } from "react-router-dom";

export default function MovesTable({
  pokeMoves,
  title,
  description,
  filterFn,
  showLevel = true,
  tmColumnLabel = "Lv",
}: {
  pokeMoves?: MoveDetails[];
  title: string;
  description: string;
  filterFn: (move: MoveDetails) => boolean;
  showLevel?: boolean;
  tmColumnLabel?: string;
}) {
  const { name } = useParams();

  // Handle missing data
  if (!pokeMoves || pokeMoves.length === 0) return null;

  const filteredMoves = pokeMoves.filter(filterFn);
  if (filteredMoves.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-4 rounded-[8px]">
      <h3 className="text-gray-dark text-xl font-semibold">{title}</h3>
      <p className="text-gray-primary">
        <span className="capitalize">{name}</span> {description}
      </p>
      <table className="divide-y divide-gray-200 text-sm text-left rounded-[8px] border border-gray-200 w-full">
        <thead className="bg-light-grey uppercase text-xs font-semibold text-gray-700">
          <tr>
            {showLevel && <th className="px-2 py-2">{tmColumnLabel}</th>}
            <th className="px-2 py-2">Move</th>
            <th className="px-2 py-2">Type</th>
            <th className="px-2 py-2">Category</th>
            <th className="px-2 py-2">Power</th>
            <th className="px-2 py-2">Accuracy</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {filteredMoves.map((move, index) => (
            <TableRow
              key={index}
              moveUrl={move.move.url}
              levelLearnedAt={showLevel ? move.levelLearnedAt : undefined}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
