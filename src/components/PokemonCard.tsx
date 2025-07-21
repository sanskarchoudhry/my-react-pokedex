import { PokemonType, TypeInfo, types } from "@/constants/pokemonType";
import { PokemonData } from "@/services/api/server/pokemonService";
import { dexNumberFormatter } from "@/utils/dexNumberFormatter";
import Image from "next/image";

export default function PokemonCard({
  pokemonData,
}: {
  pokemonData: PokemonData;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-32 h-56 capitalize">
      <a href={`/pokemon/${pokemonData.species.name}`}>
        {pokemonData?.sprites?.other?.["official-artwork"]?.front_default ? (
          <Image
            src={
              pokemonData?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt={`${pokemonData.species.name} image`}
            className="h-24 w-24 cursor-pointer"
            height={96}
            width={96}
          />
        ) : (
          <div className="h-24 w-24 cursor-pointer flex flex-col gap-2 items-center justify-center">
            <Image
              src={"/file.svg"}
              alt={`${pokemonData.name} image not available`}
              height={50}
              width={50}
            />
            <figure>
              <strong className="text-gray-primary">No Image</strong>
            </figure>
          </div>
        )}
      </a>
      <div className="text-gray-primary opacity-70">
        {dexNumberFormatter(pokemonData.id)}
      </div>
      <a
        href={`/pokemon/${pokemonData.species.name}`}
        className="font-semibold text-gray-primary opacity-90 hover:underline hover:text-link-blue"
      >
        {pokemonData.species.name}
      </a>
      <div className="flex gap-2">
        {pokemonData.types.map((type: TypeInfo, index) => {
          const typeName = type.type.name as PokemonType;
          const color = types[typeName]?.bgColor || "gray";

          return (
            <div
              key={index}
              className="py-0.5 text-center font-medium capitalize rounded-md hover:underline cursor-pointer"
              style={{ color }}
            >
              {typeName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
