import { useMemo, useState } from "react";
import {
  flattenedPokemonMove,
  PokemonMove,
} from "../../../utils/flattenPokemonMovesArray";
import { generations, VersionGroup } from "../../../constants/generations";
import MovesDetails from "./MovesDetails";
import { extractGenerationIDFromURL } from "../../../utils";
import { useParams } from "react-router-dom";

function MovesWrapper({
  pokeMoves,
  pokemonGeneration,
}: {
  pokeMoves: PokemonMove[];
  pokemonGeneration: string;
}) {
  const { id } = useParams();
  const [generationID, setGenerationID] = useState<number>(9);

  const handleGenerationChange = (genID: number) => {
    setGenerationID(genID);
  };

  const flattenedMoves = useMemo(
    () => flattenedPokemonMove(pokeMoves),
    [pokeMoves]
  );
  return (
    <section className="">
      <h1 className="font-bold text-4xl capitalize">Moves learned by {id}</h1>
      <div className="flex flex-row justify-center gap-16 items-center bg-link-blue/10 p-5 rounded-[4px] mt-8">
        <h3 className=" text-gray-dark text-lg font-semibold">
          For other generations:
        </h3>
        <ul className="flex gap-2">
          {generations
            .filter(
              (gen) =>
                Number(gen.id) >=
                Number(extractGenerationIDFromURL(pokemonGeneration))
            )
            .map((generation, index) => {
              return (
                <li
                  className={`cursor-pointer ${
                    Number(generation.id) === generationID
                      ? "text-visited-link-red underline font-semibold"
                      : "text-link-blue"
                  }  hover:font-semibold hover:underline select-none pr-2 ${
                    index !== generations.length - 1 &&
                    "border-r border-r-link-blue/40"
                  }`}
                  key={index}
                  onClick={() => {
                    handleGenerationChange(Number(generation.id));
                  }}
                >
                  {generation.title}
                </li>
              );
            })}
        </ul>
      </div>
      {generationID && flattenedMoves[generationID - 1] && (
        <MovesDetails
          movesArray={flattenedMoves[generationID - 1]}
          gameArray={
            Object.keys(flattenedMoves[generationID - 1]) as VersionGroup[]
          }
        />
      )}
      <div className="flex flex-row justify-center gap-16 items-center bg-link-blue/10 p-5 rounded-[4px] mt-8">
        <h3 className=" text-gray-dark text-lg font-semibold">
          For other generations:
        </h3>
        <ul className="flex gap-2">
          {generations
            .filter(
              (gen) =>
                Number(gen.id) >=
                Number(extractGenerationIDFromURL(pokemonGeneration))
            )
            .map((generation, index) => {
              return (
                <li
                  className={`cursor-pointer ${
                    Number(generation.id) === generationID
                      ? "text-visited-link-red underline font-semibold"
                      : "text-link-blue"
                  }  hover:font-semibold hover:underline select-none pr-2 ${
                    index !== generations.length - 1 &&
                    "border-r border-r-link-blue/40"
                  }`}
                  key={index}
                  onClick={() => {
                    handleGenerationChange(Number(generation.id));
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
