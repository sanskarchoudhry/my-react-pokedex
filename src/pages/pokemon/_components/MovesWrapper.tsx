import { useMemo, useState } from "react";
import {
  flattenedPokemonMove,
  PokemonMove,
} from "../../../utils/flattenPokemonMovesArray";
import { generations, VersionGroup } from "../../../constants/generations";
import MovesDetails from "./MovesDetails";

function MovesWrapper({ pokeMoves }: { pokeMoves: PokemonMove[] }) {
  const [generationID, setGenerationID] = useState<number>(9);

  const handleGenerationChange = (genID: number) => {
    setGenerationID(genID);
  };

  const flattenedMoves = useMemo(
    () => flattenedPokemonMove(pokeMoves),
    [pokeMoves]
  );
  return (
    <section>
      <div>
        <h3 className=" text-gray-dark text-xl font-semibold">
          For other generations
        </h3>
        <ul className="flex">
          {generations.map((generation, index) => {
            return (
              <li
                className="cursor-pointer text-link-blue hover:font-semibold hover:underline select-none  pr-2"
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
      <MovesDetails
        movesArray={flattenedMoves[generationID - 1]}
        gameArray={
          Object.keys(flattenedMoves[generationID - 1]) as VersionGroup[]
        }
      />
    </section>
  );
}

export default MovesWrapper;
