import { NameUrl } from "../../../types";
import TableRow from "./TableRow";

export default function MoveTable({
  tableRows,
  moveList,
}: {
  tableRows: string[];
  moveList: NameUrl[];
}) {
  if (!moveList) return null;

  return (
    <div className="overflow-x-auto rounded-t-[2px] mt-6">
      <table className="min-w-full bg-white text-sm text-gray-800">
        <thead className="bg-gray-primary/15">
          <tr>
            {tableRows.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left font-bold uppercase tracking-wide text-xs"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {moveList.map((move, i) => (
            <TableRow moveName={move.name} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
