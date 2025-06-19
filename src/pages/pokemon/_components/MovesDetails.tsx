import { useEffect, useState } from "react";
import {
  FlattenedPokemonMove,
  MoveDetails,
} from "../../../utils/flattenPokemonMovesArray";
import { VersionGroup } from "../../../constants/generations";
import MovesTable from "./MovesTable";

function MovesDetails({
  movesArray,
  gameArray,
}: {
  movesArray: FlattenedPokemonMove;
  gameArray: VersionGroup[];
}) {
  const [selectedGameVersion, setSelectedGameVersion] = useState<VersionGroup>(
    gameArray[0]
  );

  useEffect(() => {
    if (gameArray.length > 0) {
      setSelectedGameVersion(gameArray[0]);
    }
  }, [gameArray]);

  return (
    <div>
      <ul className="flex gap-2">
        {gameArray.map((game: VersionGroup, index) => (
          <li
            key={index}
            onClick={() => setSelectedGameVersion(game)}
            className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
              game === selectedGameVersion ? "bg-white" : "bg-light-grey"
            }`}
          >
            {game}
          </li>
        ))}
      </ul>
      <MovesTable
        pokeMoves={movesArray[selectedGameVersion] as MoveDetails[]}
      />
    </div>
  );
}

// TODO : Make sure to fix the generation move bug where pokemon shouldn't be available for previous generations

export default MovesDetails;
