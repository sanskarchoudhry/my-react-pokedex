import { useEffect, useState } from "react";
import { FlattenedPokemonMove } from "../../../utils/flattenPokemonMovesArray";
import { VersionGroup } from "../../../constants/generations";

function MovesTable({
  movesArray,
  gameArray,
}: {
  movesArray: FlattenedPokemonMove;
  gameArray: VersionGroup[];
}) {
  const [selectedGameVersion, setSelectedGameVersion] = useState<string>(
    gameArray[0]
  );

  return (
    <div>
      <ul>
        {gameArray.map((game: VersionGroup, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                setSelectedGameVersion(game);
                console.log(movesArray[game]);
              }}
            >
              {game}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MovesTable;
