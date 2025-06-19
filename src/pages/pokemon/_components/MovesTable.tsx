import { MoveDetails } from "../../../utils/flattenPokemonMovesArray";
import TableRow from "../../../components/TableRow";

export default function MovesTable({
  pokeMoves,
}: {
  pokeMoves: MoveDetails[];
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Lv</th>
          <th>Move</th>
          <th>Type</th>
          <th>Category</th>
          <th>Power</th>
          <th>Accuracy</th>
        </tr>
      </thead>
      <tbody>
        {pokeMoves &&
          pokeMoves
            .filter((move) => move.learnedMethod.name === "level-up")
            .map((move, index) => {
              return (
                <TableRow
                  moveUrl={move.move.url}
                  key={index}
                  levelLearnedAt={move.levelLearnedAt}
                />
              );
            })}
      </tbody>
    </table>
  );
}
