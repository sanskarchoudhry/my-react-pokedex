import { useEffect, useState } from "react";
import { NameUrl } from "../../../types";
import { fetchMoveData, MoveData } from "../../../services/api/moveService";
import TableRow from "./TableRow";

type SortConfig = {
  key: keyof MoveData;
  direction: "asc" | "desc";
} | null;

export default function MoveTable({
  tableRows,
  moveList,
}: {
  tableRows: string[];
  moveList: NameUrl[];
}) {
  const [moves, setMoves] = useState<MoveData[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });

  const unsortableColumns = ["type", "category", "effect"];

  useEffect(() => {
    async function fetchAllMoves() {
      const promises = moveList.map((move) => fetchMoveData(move.name));
      const data = await Promise.all(promises);
      setMoves(data.filter(Boolean)); // filter out undefined/null
    }
    fetchAllMoves();
  }, [moveList]);

  const handleSort = (columnKey: keyof MoveData) => {
    setSortConfig((prev) => {
      if (prev?.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: columnKey, direction: "asc" };
    });
  };

  const sortedMoves = sortConfig
    ? [...moves].sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        // Special handling for accuracy field
        if (sortConfig.key === "accuracy") {
          const accA =
            valA !== null && valA !== undefined
              ? valA
              : a.damage_class.name !== "status"
              ? Infinity
              : -1;

          const accB =
            valB !== null && valB !== undefined
              ? valB
              : b.damage_class.name !== "status"
              ? Infinity
              : -1;

          const isAMissing = accA === -1;
          const isBMissing = accB === -1;

          // Always push "-" to bottom
          if (isAMissing && isBMissing) return 0;
          if (isAMissing) return 1;
          if (isBMissing) return -1;

          return sortConfig.direction === "asc"
            ? (accA as number) - (accB as number)
            : (accB as number) - (accA as number);
        }

        // Handle string values
        if (typeof valA === "string" && typeof valB === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        // Handle number values
        if (
          (typeof valA === "number" || valA === null || valA === undefined) &&
          (typeof valB === "number" || valB === null || valB === undefined)
        ) {
          const aMissing = valA === null || valA === undefined;
          const bMissing = valB === null || valB === undefined;

          if (aMissing && bMissing) return 0;
          if (aMissing) return 1;
          if (bMissing) return -1;

          return sortConfig.direction === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
        }

        return 0;
      })
    : moves;

  return (
    <div className="overflow-x-auto rounded-t-[2px] mt-6">
      <table className="min-w-full bg-white text-sm text-gray-800">
        <thead className="bg-gray-primary/15">
          <tr>
            {tableRows.map((col, i) => {
              const key =
                col.toLowerCase() === "move"
                  ? "name"
                  : (col.toLowerCase() as keyof MoveData);

              const isSorted = sortConfig?.key === key;

              return (
                <th
                  key={i}
                  onClick={() => {
                    if (!unsortableColumns.includes(key)) handleSort(key);
                  }}
                  className={`px-4 py-3 text-left font-bold uppercase tracking-wide text-xs ${
                    unsortableColumns.includes(key)
                      ? "cursor-default "
                      : "cursor-pointer select-none"
                  }`}
                >
                  {col}
                  {!unsortableColumns.includes(key) && isSorted && (
                    <span className="ml-1">
                      {sortConfig
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "↑↓"}
                    </span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sortedMoves.map((moveData, index) => (
            <TableRow key={index} moveData={moveData} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
