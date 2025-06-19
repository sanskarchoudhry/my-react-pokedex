import { useEffect, useMemo, useState } from "react";
import {
  flattenedPokemonMove,
  PokemonMove,
} from "../../../utils/flattenPokemonMovesArray";
import { generations, VersionGroup } from "../../../constants/generations";
import MovesTable from "./MovesTable";

function MovesWrapper({ pokeMoves }: { pokeMoves: PokemonMove[] }) {
  const [generationID, setGenerationID] = useState<number>(9);

  const handleGenerationChange = (genID: number) => {
    setGenerationID(genID);
    console.log(generationID);
  };

  const flattenedMoves = useMemo(
    () => flattenedPokemonMove(pokeMoves),
    [pokeMoves]
  );

  useEffect(() => {}, []);
  return (
    <section>
      <div>
        <ul>
          {generations.map((generation, index) => {
            return (
              <li
                className="cursor-pointer text-link-blue font-semibold hover:underline select-none"
                key={index}
                onClick={() => {
                  handleGenerationChange(Number(generation.genID));
                }}
              >
                {generation.name}
              </li>
            );
          })}
        </ul>
      </div>
      <MovesTable
        movesArray={flattenedMoves[generationID - 1]}
        gameArray={
          Object.keys(flattenedMoves[generationID - 1]) as VersionGroup[]
        }
      />
    </section>
  );
}

export default MovesWrapper;
