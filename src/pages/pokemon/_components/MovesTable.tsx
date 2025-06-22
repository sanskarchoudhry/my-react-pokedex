import { MoveDetails } from "../../../utils/flattenPokemonMovesArray";
import TableRow from "../../../components/TableRow";
import { useParams } from "react-router-dom";

export default function MovesTable({
  pokeMoves,
}: {
  pokeMoves: MoveDetails[];
}) {
  const { name } = useParams();
  return (
    <section>
      <div className="overflow-x-auto mt-4 rounded-[8px]">
        <h3 className="ext-gray-dark text-xl font-semibold">
          Moves learned by levelling up
        </h3>
        <p className="text-gray-primary">
          <span className="capitalize">{name}</span> learns these moves while
          levelling up
        </p>
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
                .filter(
                  (move) =>
                    move.learnedMethod.name === "level-up" &&
                    move.levelLearnedAt !== 0
                )
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
      <div className="overflow-x-auto mt-4 rounded-[8px]">
        <h3 className="ext-gray-dark text-xl font-semibold">
          Moves learned on evolution
        </h3>
        <p className="text-gray-primary">
          <span className="capitalize">{name}</span> learns the following moves
          when it evolves (regardless of level).
        </p>
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
                .filter(
                  (move) =>
                    move.learnedMethod.name === "level-up" &&
                    move.levelLearnedAt === 0
                )
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
      <div className="overflow-x-auto mt-4 rounded-[8px]">
        <h3 className="ext-gray-dark text-xl font-semibold">
          Moves learned by TM
        </h3>
        <p className="capitalize text-gray-primary">
          {name} learns these moves using TMs
        </p>
        <table className=" divide-y divide-gray-200 text-sm text-left rounded-[8px] border border-gray-200">
          <thead className="bg-light-grey uppercase text-xs font-semibold text-gray-700">
            <tr>
              <th className="px-2 py-2">TM</th>
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
                .filter((move) => move.learnedMethod.name === "machine")
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
      <div className="overflow-x-auto mt-4 rounded-[8px]">
        <h3 className="ext-gray-dark text-xl font-semibold">Egg moves</h3>
        <p className="capitalize text-gray-primary">
          {name} learns the following moves via breeding or picnics
        </p>
        <table className=" divide-y divide-gray-200 text-sm text-left rounded-[8px] border border-gray-200">
          <thead className="bg-light-grey uppercase text-xs font-semibold text-gray-700">
            <tr>
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
                .filter((move) => move.learnedMethod.name === "egg")
                .map((move, index) => (
                  <TableRow key={index} moveUrl={move.move.url} />
                ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto mt-4 rounded-[8px]">
        <h3 className="ext-gray-dark text-xl font-semibold">
          Move tutor moves
        </h3>
        <p className="capitalize text-gray-primary">
          {name} can be taught these attacks from move tutors
        </p>
        <table className=" divide-y divide-gray-200 text-sm text-left rounded-[8px] border border-gray-200">
          <thead className="bg-light-grey uppercase text-xs font-semibold text-gray-700">
            <tr>
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
                .filter((move) => move.learnedMethod.name === "tutor")
                .map((move, index) => (
                  <TableRow key={index} moveUrl={move.move.url} />
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
