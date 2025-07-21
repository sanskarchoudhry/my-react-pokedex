import { useEffect, useState } from "react";
import { fetchMoveData, MoveData } from "../../services/api/moveService";
import { useParams } from "react-router-dom";
import ContainerWrapper from "../../components/ContainerWrapper";
import { types } from "../../constants/pokemonType";
import GameEntryWrapper from "./components/GameEntryWrapper";

function MoveDetailsPage() {
  const { moveName } = useParams();
  const [moveData, setMoveData] = useState<MoveData>();

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMoveData(moveName);
      setMoveData(data);
    }

    fetchData();
  }, [moveName]);

  if (!moveData) return null;

  return (
    <ContainerWrapper>
      <main className="bg-white p-8 mt-14 w-[75%] rounded-t-[6px]">
        <header className="mb-6">
          <h1 className="font-bold text-4xl text-gray-primary capitalize text-center">
            {moveData.name}
          </h1>
        </header>

        <section className="flex">
          <section className="w-[25%] p-4" aria-labelledby="move-data-heading">
            <h2
              id="move-data-heading"
              className="text-3xl font-bold text-center text-gray-primary mb-4"
            >
              Move Data
            </h2>

            <dl className="flex flex-col gap-3 text-sm text-gray-primary">
              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  Type
                </dt>
                <dd className="w-1/2 pl-4">
                  <span
                    className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
                    style={{
                      backgroundColor: types[moveData.type.name]?.bgColor,
                    }}
                  >
                    {moveData.type.name}
                  </span>
                </dd>
              </div>

              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  Category
                </dt>
                <dd className="w-1/2 pl-4 capitalize flex items-center gap-2">
                  <img
                    src={`https://img.pokemondb.net/images/icons/move-${moveData.damage_class.name}.png`}
                    alt={moveData.damage_class.name}
                    className="h-5"
                  />
                  {moveData.damage_class.name}
                </dd>
              </div>

              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  Power
                </dt>
                <dd className="w-1/2 pl-4">{moveData.power ?? "-"}</dd>
              </div>

              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  Accuracy
                </dt>
                <dd className="w-1/2 pl-4">{moveData.accuracy ?? "-"}</dd>
              </div>

              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  PP
                </dt>
                <dd className="w-1/2 pl-4">{moveData.pp}</dd>
              </div>

              <div className="flex justify-between border-b border-gray-primary/20 pb-1">
                <dt className="font-medium w-1/2 text-right text-gray-primary/70">
                  Introduced
                </dt>
                <dd className="w-1/2 pl-4 capitalize">
                  {moveData.generation.name}
                </dd>
              </div>
            </dl>
          </section>

          <section className="p-4 w-[75%]" aria-labelledby="effect-heading">
            <h2
              id="effect-heading"
              className="text-3xl font-bold text-gray-primary"
            >
              Effects
            </h2>
            <p className="text-gray-primary/90 leading-7 mt-4">
              {moveData.effect_entries[0].effect}
            </p>
          </section>
        </section>
        <GameEntryWrapper gameDescription={moveData.flavor_text_entries} />
      </main>
    </ContainerWrapper>
  );
}

export default MoveDetailsPage;
