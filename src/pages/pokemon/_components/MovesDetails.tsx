import {
  FlattenedPokemonMove,
  MoveDetails,
} from "../../../utils/flattenPokemonMovesArray";
import { VersionGroup } from "../../../constants/generations";
import MovesTable from "./MovesTable";
import { useEffect, useState } from "react";

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

  const currentMoves = movesArray[selectedGameVersion] as MoveDetails[];

  return (
    <div className="w-full">
      <ul className="flex gap-2 border-b border-b-gray-primary/20 w-full">
        {gameArray.map((game, index) => (
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
        title="Moves learned by levelling up"
        description="learns these moves while levelling up"
        pokeMoves={currentMoves}
        filterFn={(m) =>
          m.learnedMethod.name === "level-up" && m.levelLearnedAt !== 0
        }
      />

      <MovesTable
        title="Moves learned on evolution"
        description="learns the following moves when it evolves (regardless of level)."
        pokeMoves={currentMoves}
        filterFn={(m) =>
          m.learnedMethod.name === "level-up" && m.levelLearnedAt === 0
        }
        showLevel={false}
      />

      <MovesTable
        title="Moves learned by TM"
        description="learns these moves using TMs"
        pokeMoves={currentMoves}
        filterFn={(m) => m.learnedMethod.name === "machine"}
        tmColumnLabel="TM"
        showLevel={false}
      />

      <MovesTable
        title="Egg moves"
        description="learns the following moves via breeding or picnics"
        pokeMoves={currentMoves}
        filterFn={(m) => m.learnedMethod.name === "egg"}
        showLevel={false}
      />

      <MovesTable
        title="Move tutor moves"
        description="can be taught these attacks from move tutors"
        pokeMoves={currentMoves}
        filterFn={(m) => m.learnedMethod.name === "tutor"}
        showLevel={false}
      />
    </div>
  );
}

export default MovesDetails;
