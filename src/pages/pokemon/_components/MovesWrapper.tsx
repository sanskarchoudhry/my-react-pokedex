import { useMemo, useState } from "react";
import {
  flattenedPokemonMove,
  PokemonMove,
} from "../../../utils/flattenPokemonMovesArray";
import { generations, VersionGroup } from "../../../constants/generations";
import MovesDetails from "./MovesDetails";
import { extractGenerationIDFromURL } from "../../../utils";

function MovesWrapper({
  pokeMoves,
  pokemonGeneration,
}: {
  pokeMoves: PokemonMove[];
  pokemonGeneration: string;
}) {
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
      {generationID && flattenedMoves[generationID - 1] && (
        <MovesDetails
          movesArray={flattenedMoves[generationID - 1]}
          gameArray={
            Object.keys(flattenedMoves[generationID - 1]) as VersionGroup[]
          }
        />
      )}
      <div>
        <h3 className=" text-gray-dark text-xl font-semibold">
          For other generations
        </h3>
        <ul className="flex">
          {generations
            .filter(
              (gen) =>
                Number(gen.genID) >=
                Number(extractGenerationIDFromURL(pokemonGeneration))
            )
            .map((generation, index) => {
              return (
                <li
                  className="cursor-pointer text-link-blue hover:font-semibold hover:underline select-none  pr-2"
                  key={index}
                  onClick={() => {
                    handleGenerationChange(Number(generation.genID));
                  }}
                >
                  {generation.title}
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}

export default MovesWrapper;
